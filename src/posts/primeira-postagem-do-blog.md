---
title: 'O começo do blog'
author: 'Matheus Felipe'
summary: O motivo da criação do blog e alguns detalhes sobre a construção dele
tags: 'Hello world, Javascript, Nextjs'
createdAt:
  iso: '2021-07-31T02:57:07.654Z'
  formated: 30 de Julho de 2021
---

## Um resumo resumido

Meu nome é Matheus e estou cursando Ciência da Computação pela UFMT, o **Blog** é uma forma para aprender mais e também compartilhar conhecimento.

Talvez você ser pergunte, o porquê criar um blog ao invés de utilizar o [medium.com](https://medium.com)? Bom, eu queria algo mais `meu` e também saber exatamente como funcionava um blog.

Já faz um tempo que me pergunto se é melhor usar [Markdown](https://docs.pipz.com/central-de-ajuda/learning-center/guia-basico-de-markdown#open), ou um editor que já retorna um HTML com os textos. Até o momento estou curtindo usar o [Markdown](https://docs.pipz.com/central-de-ajuda/learning-center/guia-basico-de-markdown#open) e depois transpilar para HTML, funciona bem!

> Sem termos técnicos demais: Markdown e HTML são 'apenas' linguagens de marcação, aqui eles devem deixar o conteúdo do blog em um padrão para eu poder manipular.\
> \
> Um texto cru, o famoso .txt, ficaria feio e difícil para estilizar.

## Quais conteúdos?

Faço algoritmos para tudo que me gera interesse... Então nesse blog pode ter de tudo, porém a maior parte de conteúdo possa ser relacionado a WEB, por conta que estou tentando trabalhar como **_front-end_** e **_UI/UX_**.

## Criação dos textos/editor

Escrevo no [stackedit](https://stackedit.io/) e vejo as possíveis correções na [clarice.ai](clarice.ai).

O **_stackedit_** é apenas um editor de markdown com uma pré visualização, já o site **_clarice_** é uma IA que consegue corrigir textos e dar uma nota(é incrível, recomendo demais o uso).

## Qual linguagem de programação foi utilizada, frameworks, libs?

### Javascripto

A linguagem foi o tal do **Javascript**. Agora sendo mais preciso: foi o superset chamado **[Typescript](https://www.typescriptlang.org/)** (basicamente adiciona tipagem e alguns recursos interessantes para o javascript).

### Nextjs

Ir só no javascript vanilla seria bem trabalhoso, então não tentei recriar a roda, utilizei o **[Nextjs](https://nextjs.org/)**.

Aproveitei a parte de gerar sites estáticos e fiz cada página do blog ser gerada na build do projeto(getStatisPaths + getStatisProps).

> talvez você tenha percebido que esse blog abre tudo muito rápido, isso é por causa do Nextjs que já deixa tudo pronto e só envia alguns arquivos para você

### Styled-components

Nos estilos eu optei por **CSS in JS**, o famoso [styled-components](https://styled-components.com/).

Sou fã demais do Styled, alguns motivos: opção de passar os parâmetros para o CSS e evitar aquele monte de **_className_** e **_ID_**; melhora na legibilidade do código.

> Vamos manter tudo em JS? \
> R.: Quase tudo :)

![Galo cego(apelido de uma pessoa que virou meme) fazendo beleza](/content/memes/blz.gif)

### Remark

O [Remark](https://github.com/remarkjs/remark) é o responsável por transpilar **_Markdown_** para **_HTML_**.

O código utilizado pelo blog está assim:

```javascript
// src/service/markdown.js
import remark from 'remark'
import html from 'remark-html'
import footnotes from 'remark-footnotes'
import remarkGfm from 'remark-gfm'
import prism from 'remark-prism'

export default async function toHTML(markdown) {
  const result = await remark()
    .use(footnotes)
    .use(remarkGfm)
    .use(html)
    .use(prism)
    .process(markdown)

  // <img src="/img.png"> to <img src="img.png" loading="lazy">
  return result
    .toString()
    .replace(/<img (?<attributes>.*)">{1}/gm, `<img $1" loading="lazy">`)
}
```

## Como está funcionando

1.  Escrevo o conteúdo da postagem em um **_arquivo.md_**;

2.  Faço o envio(`push origin master`) desse **_arquivo.md_** para o _github_;

3.  A vercel entra em ação e faz a build do novo commit;

4.  O algoritmo percorre todos os arquivos da pasta **_posts_** transformando-os em HTML(remark) e criando uma página para cada.

5.  Vocês veem uma nova postagem no blog :)

Acredito que para algo usado por mais pessoas seria melhor usar um CMS, mas por aqui é só eu ✌️.

#### speedrun de uma postagem teste

(sem mandar para o repositório no github)

![gif acelerado de eu criando uma postagem no blog](/content/speedrun.gif)

## Acessibilidade

Usando como base os conhecimentos tanto de UI/UX quanto das postagens do [Willian Justen](https://willianjusten.com.br/) eu melhorei a acessibilidade desse blog... Coloquei em prática o uso dos **_tabindex, alt, title e html semântico_** + uns truques com a **ContextAPI**.

> se você é uma pessoa portadora de necessidades especiais e/ou utiliza leitores de tela, por favor me mande um feedback sobre a acessibilidade desse blog.\
> email: matheuscorreia559@gmail.com\
> \
> Eu testei, mas é sempre bom ter o feedback do público alvo.

Nesse vídeo abaixo a navegação foi feita apenas com o teclado, perceba a mudança do **_tabindex_** no canto direito.
Esse menu da esquerda quando ativo, desabilita o **_tabindex_** das postagens, permitindo que o usuário só navegue na área visível(aqui que entra a **contextAPI**).

<figure class="video_container">
  <video controls loop autoplay>
    <source src="/content/acessibilidade.mp4" type="video/mp4">
  </video>
</figure>

## Bônus

#### Por quê tem alguns quadrados do lado de cada postagem?

Isso aqui:
![vários quadrados verdes bem pequenos, alguns estão separados tanto em x quando em y](/content/pixels.png)

> obs.: só aparece no desktop/computador/tablet

É um suporte para postagem, foi feito apenas para decoração. É realmente necessário? Não!\
Cada postagem tem seu mapa(quadradinhos/pixels) único, ou quase único.

O algoritmo funciona indo em cada letra do título e pegando a posição dela no alfabeto, começando em 1 e indo até 26, depois é feito duas condicionais que usam o índice da letra no título, com isso é gerado um **x** e **y**, e o algoritmo desenha um retângulo de 1 pixel nessa posição.

_condicional 1_ => Se o **índice** daquela letra no título for par, o **x** recebe o valor do **índice**. Se não, o **x** fica sendo o índice da letra no alfabeto.

_condicional 2_ => Se o **x** for par, o **y** vai ser o índice da letra no alfabeto. Se não, o **y** fica sendo o índice da letra no título.

```javascript
const x = indexInString % 2 === 0 ? indexInString : indexInAlphabet
const y = x % 2 === 0 ? indexInAlphabet : indexInString
```

#### Canvas.

Os pixels foram desenhados no **Canvas**.\
É necessário adicionar no CSS do **Canvas** a propriedade:

```css
/* src/components/Post/style.tsx */
image-rendering: pixelated;
```

essa propriedade mantém o estilo pixelado e com definição(sem um 'blur')

Abaixo você encontra como ficaria sem a propriedade **_image-rendering:pixelated_**

![vários quadrados verdes bem pequenos, alguns estão separados tanto em x quando em y, mas tem um blur nos quadrados](/content/pixelSemCSS.png)

#### Código que cria os quadrados(js)

```javascript
// src/components/Post/index.tsx

function drawRectanglePixel(
  cvs: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  str: string
) {
  str = str.replace(/[^\w\s]/gi, '').replace(/\s/gi, '')

  let size = str.split('').length

  size = size < 26 ? 26 : size

  cvs.width = size
  cvs.height = size

  drawChess(ctx, size)

  str.split('').forEach((s, indexInString) => {
    if (indexInString === str.length - 1) return

    const indexInAlphabet = s.toLowerCase().charCodeAt(0) - 97 + 1

    const x = indexInString % 2 === 0 ? indexInString : indexInAlphabet
    const y = x % 2 === 0 ? indexInAlphabet : indexInString

    ctx.fillStyle = theme.colors.primary
    ctx.fillRect(x, y, 1, 1)
  })
}
```

## Final

Acredito que seja tudo para uma primeira postagem.

Obrigado por ler até aqui!
