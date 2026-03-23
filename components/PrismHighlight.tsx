'use client'

import { useEffect } from 'react'

export default function PrismHighlight() {
  useEffect(() => {
    async function highlight() {
      const Prism = (await import('prismjs')).default
      await Promise.all([
        import('prismjs/components/prism-javascript'),
        import('prismjs/components/prism-typescript'),
        import('prismjs/components/prism-jsx'),
        import('prismjs/components/prism-tsx'),
        import('prismjs/components/prism-css'),
        import('prismjs/components/prism-bash'),
        import('prismjs/components/prism-json'),
        import('prismjs/components/prism-python'),
        import('prismjs/components/prism-c'),
        import('prismjs/components/prism-markdown'),
        import('prismjs/components/prism-yaml'),
        import('prismjs/components/prism-sql'),
        import('prismjs/components/prism-diff'),
      ])
      Prism.highlightAll()
    }
    highlight()
  }, [])

  return null
}
