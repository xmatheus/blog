import { FC } from 'react'
import { AppProps } from 'next/app'
import { CustomThemeProvider } from 'src/context/theme'

import GlobalStyle from '../styles/global'
import LayoutComplete from 'src/components/layouts/complete/index'

import { Page } from 'src/components/layouts/index'
import BurgerProvider from 'src/context/burger'

import './_app_dracula_highlight.css'

type Props = AppProps & {
  Component: Page
}

const MyApp: FC<Props> = ({ Component, pageProps }) => {
  const { Layout = LayoutComplete } = Component
  // const Layout = Component.Layout || (children => <>{children}</>)
  return (
    <CustomThemeProvider>
      <BurgerProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <GlobalStyle />
      </BurgerProvider>
    </CustomThemeProvider>
  )
}

export default MyApp
