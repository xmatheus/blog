import Prism from 'prismjs'
import loadLanguages from 'prismjs/components/index.js'
import { toString } from 'hast-util-to-string'
import { visit } from 'unist-util-visit'
import type { Element, ElementContent, Root } from 'hast'

// Same grammar set the old client-side highlighter shipped with
loadLanguages(['javascript', 'typescript', 'jsx', 'tsx', 'css', 'bash', 'json', 'python', 'c', 'markdown', 'yaml', 'sql', 'diff'])

function getLanguage(node: Element): string | undefined {
  const classes = node.properties.className
  if (!Array.isArray(classes)) return
  const match = classes.map(String).find(c => c.startsWith('language-'))
  return match?.slice('language-'.length)
}

/**
 * Highlights fenced code blocks at build time, producing the same markup
 * Prism.highlightAll() generated in the browser: `language-*` on both
 * `<pre>` and `<code>`, token spans inside. Blocks without a language are left untouched.
 */
export function rehypePrism() {
  return (tree: Root) => {
    visit(tree, 'element', (node, _index, parent) => {
      if (node.tagName !== 'code' || parent?.type !== 'element' || parent.tagName !== 'pre') return

      const lang = getLanguage(node)
      const grammar = lang ? Prism.languages[lang] : undefined
      if (!lang || !grammar) return

      const className = `language-${lang}`
      parent.properties.className = [className]
      parent.properties.tabIndex = 0
      node.properties.className = [className]
      // `raw` nodes are emitted verbatim by rehype-stringify (allowDangerousHtml)
      const html = { type: 'raw', value: Prism.highlight(toString(node), grammar, lang) }
      node.children = [html as unknown as ElementContent]
    })
  }
}
