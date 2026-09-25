export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'theme'

export function getTheme(): Theme {
  return document.documentElement.classList.contains('light') ? 'light' : 'dark'
}

export function setTheme(theme: Theme) {
  document.documentElement.classList.remove('dark', 'light')
  document.documentElement.classList.add(theme)
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {}
}
