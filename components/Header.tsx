'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { href: '/', label: 'Blog' },
  { href: 'https://github.com/xmatheus', label: 'GitHub', external: true },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="mx-auto max-w-[680px] px-4 py-6">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold transition-colors hover:text-[var(--color-accent)]"
        >
          Matheus Felipe
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 sm:flex">
          {navLinks.map(link =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
              >
                {link.label}
              </Link>
            )
          )}
          <ThemeToggle />
        </nav>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="p-2"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="mt-4 flex flex-col gap-3 border-t border-[var(--color-divider)] pt-4 sm:hidden">
          {navLinks.map(link =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
      )}
    </header>
  )
}
