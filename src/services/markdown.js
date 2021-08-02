import remark from 'remark'
import html from 'remark-html'
import highlight from 'remark-highlight.js'
import footnotes from 'remark-footnotes'
import remarkGfm from 'remark-gfm'
import prism from 'remark-prism'

export async function toHTML(markdown) {
  const result = await remark()
    .use(footnotes)
    .use(remarkGfm)
    .use(html)
    .use(prism)
    .process(markdown)

  // <img src="/img.png"> to <img src="img.png" loading="lazy">
  return result
    .toString()
    .replace(/<img (?<rest>.*)">{1}/gm, `<img $1" loading="lazy">`)
}

export default { toHTML }
