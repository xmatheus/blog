import { FC, createContext, useCallback, useContext, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import dark, { white } from 'src/styles/theme'

type Theme = typeof dark

interface ThemeContextData {
  toggleTheme(): void
  theme: Theme
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData)

export const useTheme = (): ThemeContextData => useContext(ThemeContext)

export const CustomThemeProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(dark)

  const toggleTheme = useCallback(() => {
    if (theme.name === 'dark') {
      setTheme(white)
    } else if (theme.name === 'white') {
      setTheme(dark)
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
