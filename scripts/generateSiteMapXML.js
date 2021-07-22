/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

function getPosts() {
  return fs.readdirSync(path.resolve(__dirname, '..', 'src', 'posts'))
}

function getPages() {
  return fs.readdirSync(path.resolve(__dirname, '..', 'src', 'pages'))
}

function filterPaths(page) {
  if (/^_/gm.test(page)) return
  if (/^offline|^api|^\[/gm.test(page)) return

  const path = page
    .replace('.jsx', '')
    .replace('.js', '')
    .replace('.md', '')
    .replace('.tsx', '')
    .replace('.ts', '')
    .replace('index', '')

  return `\t<url>\n\t\t\t<loc>https://xmatheus.dev/${path}</loc>\n\t\t\t<changefreq>weekly</changefreq>\n\t\t\t<priority>1</priority>\n\t</url>`
}

function genSiteMap() {
  const items = [...getPosts(), ...getPages()].map(filterPaths).filter(t => t)

  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items.join(
    '\n'
  )}\n</urlset>`

  fs.writeFileSync(
    path.resolve(__dirname, '..', 'public', 'sitemap.xml'),
    sitemap.trim()
  )
}

genSiteMap()
