'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Trocar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
      className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover-bg"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
