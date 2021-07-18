import remark from 'remark'
import html from 'remark-html'
import highlight from 'remark-highlight.js'
import footnotes from 'remark-footnotes'
import remarkGfm from 'remark-gfm'

export async function toHTML(markdown) {
  // Processamos nosso conteúdo Markdown
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
