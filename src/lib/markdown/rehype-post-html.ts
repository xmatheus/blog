import { visit } from 'unist-util-visit'
import type { Root } from 'hast'

/** Post-content tweaks: lazy images and scrollable table wrappers. */
export function rehypePostHtml() {
  return (tree: Root) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'img') {
        Object.assign(node.properties, { loading: 'lazy', width: '200', height: 'auto' })
        return
      }

      if (node.tagName === 'table' && parent && index !== undefined) {
        parent.children[index] = {
          type: 'element',
          tagName: 'div',
          properties: { className: ['table-wrapper'] },
          children: [node],
        }
        return 'skip'
      }
    })
  }
}
