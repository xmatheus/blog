---
title: 'Como construí um site de turismo com Next.js 15 que saiu de 600 para 10 mil impressões diárias no Google'
author: 'Matheus Felipe'
summary: 'Decisões técnicas e resultados reais do Barra Turismo: SEO, performance, monetização e os números do Search Console em 12 meses'
tags: 'Next.js, SEO, React, Vercel'
createdAt: '2026-03-22'
---

Nos últimos 12 meses, trabalhei sozinho no [Barra Turismo](https://barraturismo.com), um site de turismo para Barra do Garças, no Mato Grosso. O projeto nasceu para resolver um problema real: a cidade tem cachoeiras absurdas, praias de rio, águas quentes e fazendas de ecoturismo, mas quase nenhuma presença digital organizada.

Neste post vou mostrar as decisões técnicas por trás do projeto e os resultados reais extraídos do Google Search Console nos últimos 12 meses.

## Os números

Antes de entrar no técnico, os resultados:

| Métrica | Mar/2025 (início) | Jan/2026 (pico) | Mar/2026 (atual) |
|---|---|---|---|
| Impressões/dia | ~650 | ~6.770 | ~5.100 |
| Cliques/dia | ~19 | ~59 | ~31 |
| Posição média | 8.3 | 6.6 | 6.6 |

- **Pico de impressões em um único dia:** 10.201 (02/jan/2026, alta temporada)
- **Pico de cliques em um único dia:** 118 (14/jul/2025, férias escolares)
- **Total no período:** ~16 mil cliques e ~1,6 milhão de impressões
- **74%** do tráfego vem de dispositivos móveis

A posição média caiu de **8.3 para 6.6**, ou seja, o site subiu quase 2 posições no ranking do Google de forma orgânica, sem investir um centavo em ads.

## Stack e por que cada escolha

- **Next.js 15 (App Router + Turbopack)** para SSR/SSG nativo com SEO forte e dev local rápido
- **React 18** com Server Components para páginas sem interatividade no client
- **Tailwind CSS 3 + shadcn/ui** para prototipação rápida com design system consistente
- **Supabase** para auth e banco de dados sem gerenciar infra
- **Firebase Admin** para serviços backend pontuais
- **Jotai** para state management atômico e leve no client-side
- **Vercel** para deploy, analytics e Speed Insights integrados
- **AWS CloudFront** como CDN para servir imagens otimizadas

## Arquitetura de rotas

O App Router do Next.js permite agrupar rotas com route groups. Usei isso para separar a estrutura do site:

```
app/
├── (seo)/              ← Route group principal (layout completo)
│   ├── cachoeiras/
│   ├── praias/
│   ├── hoteis/
│   ├── fazendas/
│   ├── clima-em-barra-do-garcas/
│   ├── como-chegar-em-barra-do-garcas/
│   ├── pontos-turisticos/
│   └── ...
├── sitemap.ts
└── robots.ts
pages/
└── web-stories/        ← AMP Stories (Pages Router)
```

O route group `(seo)` carrega o layout completo: header, footer, theme provider, cart, Google Analytics, Hotjar, Amplitude e Stay22. As rotas fora dele (sitemap, robots, API) usam um layout mínimo. Web Stories ficam no Pages Router por causa do AMP.

## SEO técnico: o que realmente moveu o ponteiro

Esse é o coração do projeto. Não adianta ter um site bonito se o Google não entende o que ele é.

### Structured Data (JSON-LD)

Cada página e web story gera schemas `Article`, `BreadcrumbList` e `TouristAttraction` via `schema-dts`. Isso faz o Google entender que "Santuário das Araras" é uma atração turística em Barra do Garças, MT, e não qualquer resultado genérico.

### Meta tags com geo-targeting

O módulo `lib/seo/meta-tags.ts` gera meta tags completas por página: Open Graph (duas variações de imagem, 900x1600 e 1200x630), Twitter Cards, cache control agressivo (`max-age=31536000, immutable`) e **geo-targeting** com coordenadas da cidade (`-15.8908;-52.2647`). Isso ajuda no rankeamento para buscas locais.

### Geração dinâmica de keywords

O `keywords-generator.ts` cruza keywords por atração, por temporada (seca, chuvosa, alta) e por tipo de atividade (aventura, família, relaxamento). Cada web story recebe até 15 keywords deduplicadas e relevantes automaticamente.

### Sitemap dinâmico

O `sitemap.ts` gera automaticamente as URLs estáticas e as web stories publicadas, sem precisar manter um XML manual.

### Resultado prático

A query **"santuário das araras"** tem posição média **3.07** com 1.241 cliques. **"cachoeira azul barra do garças"** está na posição **2.18** com CTR de **15,46%**. A query de marca **"barra turismo"** tem CTR de **35%** na posição **1.33**.

## Performance e otimização de imagens

Turismo é visual. Se as imagens não carregam rápido, o usuário sai e o Google penaliza.

**Estratégia:**
- Todas as imagens servidas em **WebP** via CloudFront CDN (`cdn.barraturismo.com`)
- Cache mínimo de **31 dias** no Next.js Image Optimization
- **10 breakpoints** de device sizes configurados (de 320px a 3840px) para servir o tamanho certo para cada tela
- Lazy loading por padrão, com eager loading apenas para imagens above-the-fold
- `sharp` para processamento server-side das imagens

O resultado: mesmo com galerias de fotos pesadas, as páginas de cachoeiras e fazendas carregam rápido em 3G.

## Web Stories (AMP)

Criei 6 web stories cobrindo as principais atrações: Serra Azul, praias, águas quentes, fazendas, cachoeiras e atrações gerais. São AMP stories com auto-advance de 15 segundos, dimensões otimizadas (900x1600) e schema próprio.

No Search Console elas geraram **3.007 impressões** como "Web Story". Pouco comparado às páginas tradicionais, mas é conteúdo que aparece no Google Discover em mobile.

## Monetização: parcerias com guias locais

O site não tem anúncios tradicionais. A monetização funciona de três formas:

### 1. Guias de turismo parceiros

Parcerias com guias locais (Favo de Mel, Trilhas da Barra, Dandan). Cada atração tem um CTA que redireciona para o WhatsApp do guia com uma mensagem pré-formatada incluindo um cupom de desconto rastreável. Quando o turista agenda pelo link, o guia sabe que veio do site.

A captura de leads também alimenta uma **Google Sheets** via API route, registrando telefone, página de origem e data para os guias acompanharem.

### 2. Stay22

Integração com Stay22 para mapas de hospedagem. Quando o usuário busca hotéis próximos às atrações, o mapa do Stay22 renderiza opções de booking e gera comissão por reserva.

## O que aprendi

**SEO técnico > conteúdo genérico.** Structured data, geo-targeting e keywords bem segmentadas fizeram mais diferença que qualquer texto longo de blog.

**Imagens são o gargalo.** Em um site de turismo, a experiência visual é tudo. CDN + WebP + breakpoints responsivos é o mínimo.

**Sazonalidade é real.** Julho é temporada de praia em Barra do Garças e a cidade recebe muita gente, o pico de cliques (118 em um único dia) foi justamente nessa época. Em dezembro-janeiro as impressões também sobem porque as pessoas estão pesquisando destinos para viajar nas férias. Isso influencia até as keywords dinâmicas do gerador.

**Monetização sem ads funciona.** Parcerias diretas com guias locais e integrações de afiliados são mais sustentáveis e menos invasivas que banner ads.

**Projeto solo é viável.** Com Next.js, Vercel, Supabase e um bom CDN, dá para colocar de pé e manter um produto real sem equipe e sem infra complexa.

O [Barra Turismo](https://barraturismo.com) continua evoluindo. Se quiser trocar ideia sobre SEO técnico, Next.js ou projetos solo, me chama.
