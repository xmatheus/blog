'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { href: '/', label: 'Blog' },
  { href: 'https://github.com/xmatheus', label: 'GitHub', external: true },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'header-glass border-b border-subtle' : 'bg-main'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-5">
        <Link href="/" className="text-[15px] font-semibold tracking-tight transition-colors hover:text-[var(--color-secondary)]">
          Home
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-1 sm:flex">
          {navLinks.map(link =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-3 py-1.5 text-sm text-secondary-color transition-colors hover-bg"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm text-secondary-color transition-colors hover-bg"
              >
                {link.label}
              </Link>
            )
          )}
          <ThemeToggle />
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-1 sm:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover-bg"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-subtle px-5 py-3 sm:hidden">
          <div className="mx-auto flex max-w-2xl flex-col gap-1">
            {navLinks.map(link =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-secondary-color transition-colors hover-bg"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-secondary-color transition-colors hover-bg"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
