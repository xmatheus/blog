import { ReactNode } from 'react'
// import { AppProps } from 'next/app'
import Head from 'next/head'

import { CustomThemeProvider } from 'src/context/theme'
import GlobalStyle from '../styles/global'
import LayoutComplete from 'src/components/layouts/complete/index'
// import { Page } from 'src/components/layouts/index'
import BurgerProvider from 'src/context/burger'

import './_app_dracula_highlight.css'

// type Props = AppProps & {
//   Component: Page
// }

const MyApp: ReactNode = ({ Component, pageProps }): JSX.Element => {
  const { Layout = LayoutComplete } = Component

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <meta property="og:site_name" content="Blog do Matheus Felipe" />
        <meta
          property="og:image"
          content="https://xmatheus.dev/seo/og-image.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:site"
          content="@desabiliteiissoaqui_xmatheus.dev"
        ></meta>

        {/* Íconas para iPhone e favicon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/seo/180_180.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/seo/32_32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/seo/16_16.png" />
        <link rel="shortcut icon" href="/seo/32.png" />

        {/* Manifest para PWA */}
        <link rel="manifest" href="/seo/manifest.json" />

        {/* Detalhes da aplicação */}
        <meta name="application-name" content="xmatheus.dev" />
        <meta name="apple-mobile-web-app-title" content="xmatheus.dev" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />

        <meta name="theme-color" content="#202020"></meta>
      </Head>
      <CustomThemeProvider>
        <BurgerProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <GlobalStyle />
        </BurgerProvider>
      </CustomThemeProvider>
    </>
  )
}

export default MyApp
