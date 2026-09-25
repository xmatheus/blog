---
title: 'Como construí o Dr. Leilão: monitoramento de leilões da Caixa com Next.js 16 e Supabase'
author: 'Matheus Felipe'
summary: 'A história técnica por trás de uma plataforma que monitora diariamente milhares de imóveis de leilão da Caixa, gera centenas de páginas de blog automaticamente e entrega alertas por email para assinantes premium.'
tags: 'Next.js, Supabase, TypeScript, Programmatic SEO, Side Project'
createdAt: '2026-03-23'
---

A Caixa Econômica Federal disponibiliza diariamente dados sobre milhares de imóveis em leilão. Casas, apartamentos, terrenos, salas comerciais, espalhados por todos os 27 estados. O problema: não existe uma forma prática de filtrar, acompanhar preços ou receber alertas sobre novos imóveis.

Eu queria algo que me permitisse monitorar imóveis em cidades específicas, ver quando o preço caía, receber um aviso quando algo novo aparecesse. Como isso não existia do jeito que eu queria, construí o [Dr. Leilão](https://drleilao.com).

## O que é o Dr. Leilão

Uma plataforma de monitoramento de leilões imobiliários da Caixa. Modelo freemium: qualquer pessoa navega, filtra por estado, cidade, tipo de imóvel, faixa de preço, desconto. Quem assina o plano premium configura alertas e recebe por email quando imóveis novos aparecem nas cidades escolhidas.

A stack: **Next.js 16** com App Router, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Supabase** (banco + autenticação), **Resend** (emails transacionais), **Recharts** (gráficos de preço) e **Leaflet** (mapas).

## O pipeline de dados

O coração do projeto é a sincronização diária. Todo dia, os dados dos 27 estados são coletados em paralelo, normalizados para um schema consistente e gravados no Supabase.

O processo tem duas fases:

**Fase 1: coleta e normalização.** Os dados dos 27 estados são baixados em paralelo e normalizados. O sync detecta mudanças inesperadas no formato e me notifica via Discord.

**Fase 2: escrita no banco.** Em vez de paralelizar tudo, os writes são serializados com concorrência limitada a 5 operações simultâneas, em lotes de 500 propriedades. Imóveis novos são inseridos, existentes são atualizados, e os que saíram são marcados como inativos (nunca deletados, para preservar histórico).

```tsx
// Fase 1: coletar tudo em paralelo
const results = await Promise.allSettled(
  STATES.map((state) => fetchAndParseData(state))
)

// Fase 2: escrever com concorrência limitada
await processWithConcurrency(results, DB_CONCURRENCY, async (stateData) => {
  const batches = chunk(stateData.properties, BATCH_SIZE)
  for (const batch of batches) {
    await upsertProperties(batch)
  }
})
```

Essa separação existe por um motivo concreto: o gargalo da Fase 1 é rede (I/O), não CPU. Paralelizar faz sentido. Na Fase 2, paralelizar sem controle causa lock contention no Supabase. Aprendi isso na prática, quando o sync começou a falhar com timeout em dias de muita atualização.

Depois do upsert, o sync dispara três coisas: atualiza views materializadas, envia notificações para usuários premium, e revalida o cache.

## Snapshots de preço

Uma decisão que fez diferença foi criar a tabela `property_snapshots` separada da `properties`. Cada vez que um imóvel aparece na sincronização, um snapshot é gravado com o preço, percentual de desconto, modalidade de venda e se aceita financiamento.

Isso permite montar o gráfico de histórico de preço na página do imóvel, sem inflar a tabela principal. O componente usa **Recharts** com um AreaChart que mostra a evolução ao longo do tempo.

| Tabela | Responsabilidade |
|--------|-----------------|
| `properties` | Estado atual do imóvel (preço, cidade, tipo, status) |
| `property_snapshots` | Histórico de preço, desconto e modalidade por data |

O trade-off: preciso de duas queries para montar a página de detalhe. Mas a tabela de snapshots é prunável e não polui a tabela principal com dados históricos.

## Views materializadas para performance

As páginas de hub (lista de estados, lista de cidades) precisam de estatísticas agregadas: total de imóveis, quantos aceitam financiamento, menor preço, quantidade por tipo. Fazer um `GROUP BY` em cada request seria lento demais.

A solução foram três views materializadas no Supabase:

- **`materialized_city_stats`**: estatísticas por cidade (total, tipos, financiamento, menor preço)
- **`materialized_city_streets`**: agrupamento por rua para filtro de logradouro
- **`materialized_home_stats`**: números da home page (total geral, destaques)

Essas views são atualizadas uma vez por dia, no final do sync, via uma RPC `refresh_materialized_data()`. Como os dados mudam uma vez por dia, a defasagem é zero na prática.

## Blog com posts programáticos

O blog do Dr. Leilão tem dois tipos de conteúdo: posts manuais e posts programáticos. Os manuais são guias escritos por mim, como "Como comprar imóvel da Caixa" ou "Riscos de comprar imóvel de leilão". Os programáticos são gerados automaticamente a partir dos dados do banco.

### Posts manuais como componentes React

Cada post manual é um componente `.tsx` em `src/content/blog/`. O arquivo exporta um objeto `meta` com título, descrição, categoria, data, tempo de leitura e FAQs, e um componente React com o conteúdo. Isso permite usar componentes interativos dentro dos posts, como chamadas para ação e accordions de FAQ.

```tsx
export const meta: BlogPostMeta = {
  slug: 'como-comprar-imovel-caixa',
  title: 'Como comprar imóvel da Caixa: guia completo 2026',
  category: 'guia',
  publishedAt: '2026-03-20',
  readingTime: 12,
  relatedSlugs: ['modalidades-venda-caixa'],
  faq: [
    { question: 'Qualquer pessoa pode comprar?', answer: '...' },
  ],
}
```

Os posts são carregados via `require()` lazy. Isso evita que o bundle inclua todos os posts de uma vez.

### Posts programáticos: SEO em escala

Aqui é onde fica interessante. Para cada capital brasileira, o sistema gera automaticamente 5 variações de post:

- `casas-leilao-{cidade}`
- `apartamentos-leilao-{cidade}`
- `terrenos-leilao-{cidade}`
- `imoveis-leilao-financiamento-{cidade}`
- `imoveis-leilao-desconto-{cidade}`

São 27 capitais x 5 filtros = **135 páginas** geradas automaticamente. Cada uma com título, descrição, imóveis reais do banco de dados e FAQ específico por tipo de filtro.

A lógica de resolução usa um array de patterns com regex. Cada padrão de slug é mapeado para um filtro e um tipo de imóvel:

```tsx
const SLUG_PATTERNS = [
  { regex: /^casas-leilao-(.+)$/, filter: 'type', type: 'house' },
  { regex: /^apartamentos-leilao-(.+)$/, filter: 'type', type: 'apartment' },
  { regex: /^terrenos-leilao-(.+)$/, filter: 'type', type: 'land' },
  { regex: /^imoveis-leilao-financiamento-(.+)$/, filter: 'financing', type: null },
  { regex: /^imoveis-leilao-desconto-(.+)$/, filter: 'discount', type: null },
]
```

Na listagem do blog, posts programáticos só aparecem se a cidade tem pelo menos 3 imóveis naquele filtro. Se tem menos, a página existe mas recebe `robots: { index: false }` para não indexar conteúdo fino.

A resolução do post é um fallback chain: primeiro tenta achar um post manual pelo slug, depois tenta parsear como slug programático. Se for programático, busca os imóveis do banco com o filtro correspondente e monta a página com cards reais de propriedade.

### FAQs por filtro

Cada tipo de filtro tem um conjunto de FAQs específicas. Posts sobre financiamento recebem perguntas sobre crédito e FGTS. Posts sobre casas recebem perguntas sobre condomínio e visitação. Tudo gera JSON-LD `FAQPage` automaticamente, o que ajuda a aparecer em rich snippets do Google.

## Página de insights

A rota `/insights` é um dashboard público com estatísticas do mercado de leilões. Os dados vêm de uma RPC `get_insights_stats()` que roda no Supabase e retorna tudo de uma vez: resumo geral, série temporal, distribuição por tipo, modalidade, faixa de preço, faixa de desconto, desconto médio por estado, preço médio por estado e cidades com mais imóveis.

São 9 visualizações, cada uma em seu próprio componente:

| Componente | O que mostra |
|-----------|-------------|
| `SummaryCards` | Total de imóveis, financiamento, desconto médio, cidades |
| `DailyChart` | Série temporal de entradas e saídas diárias |
| `CategoryChart` | Distribuição por tipo (casa, apto, terreno, comercial) |
| `ModalityChart` | Distribuição por modalidade de venda |
| `PriceRangeChart` | Imóveis por faixa de preço |
| `DiscountRangeChart` | Imóveis por faixa de desconto |
| `StateDiscountChart` | Desconto médio por estado |
| `StatePriceChart` | Preço médio por estado |
| `TopCitiesChart` | Cidades com mais imóveis |

Tudo cacheado com `'use cache'` e `cacheLife('max')`, revalidado junto com o sync diário. O custo de gerar essas estatísticas é zero no runtime: a RPC roda uma vez, o cache serve o resto do dia.

A decisão de fazer o dashboard público foi estratégica. É conteúdo que agrega valor para qualquer pessoa pesquisando sobre leilões, funciona como página de entrada orgânica, e mostra a profundidade dos dados que o Dr. Leilão tem.

## OG Images dinâmicas

Cada post do blog gera sua própria imagem para Open Graph. A rota usa a API `ImageResponse` do Next.js para renderizar um card com o título do post, categoria e branding.

O visual muda por categoria: guias têm acento amarelo, riscos vermelho, dicas verde, cidades azul. Cada tema define cor, gradiente de fundo e pattern decorativo:

```tsx
const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  guia: { label: 'GUIA COMPLETO', accentColor: '#f59e0b', gradientTo: '#1a1a0a' },
  risco: { label: 'RISCOS', accentColor: '#ef4444', gradientTo: '#1a0a0a' },
  dica: { label: 'DICAS', accentColor: '#22c55e', gradientTo: '#0a1a0a' },
  cidade: { label: 'CIDADES', accentColor: '#3b82f6', gradientTo: '#0a0a1a' },
}
```

As imagens são cacheadas com `max-age=31536000, immutable`. Geradas uma vez, servidas para sempre. O impacto visual quando alguém compartilha um post no WhatsApp ou LinkedIn faz a diferença.

## Table of Contents com IntersectionObserver

Os posts do blog têm um sumário lateral sticky que acompanha a leitura. O componente `TableOfContents` é client-side: no mount, ele busca todos os `h2[id]` dentro do `<article>`, e usa um `IntersectionObserver` para destacar a seção visível.

```tsx
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        setActiveId(entry.target.id)
      }
    }
  },
  { rootMargin: '-80px 0px -60% 0px' },
)
```

O `rootMargin` com `-60%` no bottom garante que a seção é marcada como ativa quando está no terço superior da viewport, não quando aparece lá embaixo. Esse detalhe faz o sumário parecer preciso em vez de "atrasado".

## CTAs contextuais no blog

O componente `BlogCta` tem três variantes inseridas nos posts:

- **`explore`**: barra clara com link para a listagem de imóveis, usada no meio do post programático
- **`alert`**: barra escura com CTA para assinar o plano premium, usada no final
- **`custom`**: link com label e href customizáveis

Cada CTA usa a classe `not-prose` para escapar dos estilos do Tailwind Typography e manter visual consistente. Os posts programáticos inserem um CTA `explore` logo após a introdução e um CTA `alert` depois da listagem de imóveis. A posição importa: o explore aparece quando o leitor está engajado, o alert quando já viu os imóveis e está mais propenso a converter.

## Sistema de alertas

O modelo premium gira em torno dos alertas. O usuário seleciona uma cidade, escolhe quais tipos de imóvel quer monitorar e se quer apenas imóveis que aceitem financiamento.

A regra é um alerta por cidade por usuário. Quando o sync diário roda, os imóveis novos são cruzados com os alertas ativos. Se um imóvel bate nos filtros, o usuário recebe email via **Resend** e notificação in-app.

## Caching com `'use cache'`

O Next.js 16 trouxe a diretiva `'use cache'` que substituiu o `unstable_cache`. Todas as queries de dados no Dr. Leilão usam esse padrão:

```tsx
'use cache'

import { cacheTag, cacheLife } from 'next/cache'

export async function getHomeData() {
  cacheTag('properties')
  cacheLife('max')

  const supabase = createAdminClient()
  // ...queries
}
```

Cada função cacheable recebe a tag `'properties'` e vida `'max'`. Quando o sync termina, uma única `revalidateTag('properties')` invalida todas as queries. Durante o resto do dia, tudo é servido do cache.

O arquivo `cached-queries.ts` centraliza 12 funções cacheáveis: home, estados, cidades, ruas, imóveis paginados, snapshots, blog, insights. Todas com o mesmo padrão. Uma invalidação limpa tudo.

## SEO técnico

SEO é prioridade porque o tráfego orgânico é o principal canal de aquisição. Cada página gera metadata dinâmico com título, descrição e canonical URL. Páginas de detalhe incluem JSON-LD `RealEstateListing`. Posts do blog geram JSON-LD `Article` e, quando têm FAQ, também `FAQPage`.

O componente `Breadcrumb` gera automaticamente o JSON-LD `BreadcrumbList` em todas as páginas.

Os toggles de visualização (lista/mapa) usam cookies, não query params. A URL não muda ao trocar a view. Isso evita conteúdo duplicado e mantém URLs canônicas limpas.

O sitemap é `force-dynamic` com try/catch e fallback para build time, já que precisa de dados do banco mas o build roda sem acesso ao Supabase de produção.

## O que aprendi

- **Posts programáticos funcionam para SEO, mas precisam de conteúdo real.** Gerar 135 páginas só faz sentido porque cada uma tem imóveis reais, FAQs relevantes e dados atualizados. Páginas finas com `noindex` evitam penalização
- **`'use cache'` simplifica muito o caching.** Uma tag, uma vida, uma invalidação. Sem biblioteca de cache, sem Redis, sem complexidade
- **OG images dinâmicas valem o esforço.** O cache `immutable` faz o custo ser desprezível, e o impacto visual em compartilhamentos é grande
- **Separar I/O de escrita vale a pena.** O sync com duas fases (fetch paralelo, write controlado) foi a diferença entre um processo estável e um que falhava por timeout
- **Views materializadas resolvem agregações.** Se os dados mudam em frequência previsível, materializar evita cálculos repetidos sem complexidade de cache aplicacional
- **Dashboard público como estratégia de conteúdo.** A página de insights não é só feature, é uma página de entrada orgânica que demonstra a profundidade dos dados
- **Discord + PostHog é um combo eficiente.** PostHog cuida da observabilidade real (analytics, funnels, session replay). Discord fica para notificações rápidas: alertas de erros em checkout, logs de sync e avisos de novas assinaturas. Webhooks do Discord são práticos para esse tipo de alerta instantâneo sem precisar abrir dashboard

O Dr. Leilão começou como uma lista simples e hoje tem pipeline de dados, blog com conteúdo programático, insights com 9 gráficos, alertas inteligentes, histórico de preço e pagamentos. O que mantém tudo gerenciável é a simplicidade da stack: um framework fullstack, um banco de dados, e decisões pragmáticas sobre o que automatizar e o que não.
