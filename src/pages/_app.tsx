import { FC } from 'react'
// import { ThemeProvider } from 'styled-components'
import { CustomThemeProvider } from 'src/context/theme'

import GlobalStyle from '../styles/global'
import LayoutComplete from 'src/components/layouts/complete/index'

import { Page } from 'src/components/layouts/index'
import { AppProps } from 'next/app'

import './_app_dracula_highlight.css'

type Props = AppProps & {
  Component: Page
}

const MyApp: FC<Props> = ({ Component, pageProps }) => {
  const { Layout = LayoutComplete } = Component
  // const Layout = Component.Layout || (children => <>{children}</>)
  return (
    <CustomThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <GlobalStyle />
    </CustomThemeProvider>
  )
}

export default MyApp
