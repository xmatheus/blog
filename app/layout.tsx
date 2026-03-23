import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { GoogleAnalytics } from '@next/third-parties/google'
import ThemeProvider from '@/components/ThemeProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const satoshi = localFont({
  src: [
    { path: '../public/fonts/Satoshi-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/Satoshi-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Matheus Felipe · Full Stack Developer',
    template: '%s · Matheus Felipe',
  },
  description: 'Site pessoal e blog de Matheus Felipe, desenvolvedor Full Stack especializado em JavaScript, React e Node.js',
  metadataBase: new URL('https://xmatheus.dev'),
  openGraph: {
    siteName: 'Matheus Felipe',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/seo/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: [
      { url: '/seo/16_16.png', sizes: '16x16', type: 'image/png' },
      { url: '/seo/32_32.png', sizes: '32x32', type: 'image/png' },
      { url: '/seo/192_192.png', sizes: '192x192', type: 'image/png' },
      { url: '/seo/512_512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/seo/192_192.png', sizes: '192x192' },
    ],
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
}

const themeScript = `
  (function() {
    try {
      var t = localStorage.getItem('theme');
      var theme = (t === 'light' || t === 'dark') ? t : 'dark';
      document.documentElement.classList.add(theme);
    } catch(e) {
      document.documentElement.classList.add('dark');
    }
  })();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={satoshi.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen font-[family-name:var(--font-satoshi)] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Matheus Felipe',
                url: 'https://xmatheus.dev',
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'Matheus Felipe Teodoro Correia',
                url: 'https://xmatheus.dev',
                jobTitle: 'Full Stack Developer',
                sameAs: [
                  'https://github.com/xmatheus',
                  'https://www.instagram.com/matheus.ftc/',
                  'https://dribbble.com/xmatheus',
                ],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://xmatheus.dev' },
                ],
              },
            ]),
          }}
        />
        <ThemeProvider>
          <div className="geo-bg" aria-hidden="true" />
          <Header />
          <main className="mx-auto max-w-2xl px-5 py-16 sm:py-24">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </html>
  )
}
