export function generatePostSchema(post) {
  const partOne = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://google.com/article'
    },
    headline: post.title,
    datePublished: post.createdAt.iso,
    dateModified: post.updatedAt?.iso || post.createdAt.iso,
    author: {
      '@type': 'Person',
      name: 'Matheus Felipe Teodoro Correia'
    },
    publisher: {
      name: 'xmatheus.dev',
      logo: {
        '@type': 'ImageObject',
        url: 'https://xmatheus.dev/seo/512.png'
      }
    }
  }

  const parteTwo = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: post.title,
        item: `https://xmatheus.dev/${post.slug}`
      }
    ]
  }

  return [partOne, parteTwo]
}
