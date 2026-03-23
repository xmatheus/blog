import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import prism from 'remark-prism'

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(prism)
    .use(html, { sanitize: false })
    .process(markdown)

  return result
    .toString()
    .replace(
      /<img (?<attributes>.*)">{1}/gm,
      '<img $1" loading="lazy" width="200" height="auto">'
    )
}
