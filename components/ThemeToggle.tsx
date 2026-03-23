'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Trocar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
      title={`Tema atual: ${theme}`}
      className="p-2 rounded-md transition-colors hover:bg-[var(--color-surface)]"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
