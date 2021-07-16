import React from 'react'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'
import LayoutComplete from 'src/components/layouts/complete/index'

import { Page } from 'src/components/layouts/index'
import { AppProps } from 'next/app'

type Props = AppProps & {
  Component: Page
}

const MyApp: React.FC<Props> = ({ Component, pageProps }) => {
  const { Layout = LayoutComplete } = Component
  // const Layout = Component.Layout || (children => <>{children}</>)
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default MyApp
