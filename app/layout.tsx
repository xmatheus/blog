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
}

const themeScript = `
  (function() {
    try {
      var t = localStorage.getItem('theme');
      if (t === 'light' || t === 'dark') {
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(t);
      }
    } catch(e) {}
  })();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`dark ${satoshi.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-[family-name:var(--font-satoshi)] antialiased">
        <ThemeProvider>
          <Header />
          <main className="mx-auto max-w-[680px] px-4 py-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </html>
  )
}
