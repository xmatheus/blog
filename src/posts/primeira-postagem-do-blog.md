---
title: 'O começo do blog'
author: 'Matheus Felipe'
summary: O motivo de eu criar um blog e a alguns detalhes sobre a construção dele
tags: 'Test, Hello word, Life'
createdAt:
  iso: '2021-07-31T02:57:07.654Z'
  formated: 30 de Julho de 2021
---

## Um resumo resumido

Me chamo Matheus e estou cursando Ciência da Computação pela UFMT, o **Blog** é uma forma para aprender mais e compartilhar conhecimento.

Talvez você ser pergunte, o porquê criar um blog ao invés de utilizar o [medium.com](https://medium.com)? Bom, eu queria algo mais `meu` e também saber exatamente como funcionava um blog.

Já faz um tempo que me pergunto se é melhor usar [Markdown](https://docs.pipz.com/central-de-ajuda/learning-center/guia-basico-de-markdown#open), ou um editor que já retorna um HTML com os textos. Até o momento estou curtindo usar o [Markdown](https://docs.pipz.com/central-de-ajuda/learning-center/guia-basico-de-markdown#open) e depois transpilar para HTML, funciona bem!

> Sem termos técnicos demais: Markdown e HTML são 'apenas' linguagens de marcação, aqui eles devem deixar o conteúdo do blog em um padrão para eu poder manipular.\
> \
> Um texto cru, o famoso .txt, ficaria feio e difícil para estilizar.

```
Talvez para algo usado por mais pessoas seria melhor usar um CMS, mas por aqui é só eu.
```

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
//markdown.js
import remark from 'remark'
import html from 'remark-html'
import highlight from 'remark-highlight.js'
import footnotes from 'remark-footnotes'
import remarkGfm from 'remark-gfm'

export async function toHTML(markdown) {
  const result = await remark()
    .use(highlight, {
      include: ['css', 'html', 'javascript', 'markdown', 'json', 'bash']
    })
    .use(footnotes)
    .use(remarkGfm)
    .use(html)
    .process(markdown)

  return result.toString()
}

export default { toHTML }
```

## Como está funcionando

1.  Escrevo o conteúdo da postagem em um **_arquivo.md_**;

2.  Faço o envio(`push origin master`) desse **_arquivo.md_** para o _github_;

3.  A vercel entra em ação e faz a build do novo commit;

4.  O algoritmo percorre todos os arquivos da pasta **_posts_** transformando-os em HTML(remark) e criando uma página para cada.

5.  Vocês veem uma nova postagem no blog :)

#### speedrun de uma postagem teste

```
sem mandar para o repositório no github
```

![gif acelerado de eu criando uma postagem no blog](/content/speedrun.gif)

## Final

Acredito que seja tudo para uma primeira postagem.

Obrigado por ler até aqui!
