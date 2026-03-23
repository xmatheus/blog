import { Github, Instagram, Mail, Dribbble } from 'lucide-react'
import { AUTHOR } from '@/lib/constants'

const links = [
  { href: AUTHOR.github, icon: Github, label: 'GitHub' },
  { href: AUTHOR.instagram, icon: Instagram, label: 'Instagram' },
  { href: `mailto:${AUTHOR.email}`, icon: Mail, label: 'Email' },
  { href: AUTHOR.dribbble, icon: Dribbble, label: 'Dribbble' },
]

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[680px] px-4 py-12">
      <div className="flex items-center justify-between border-t border-[var(--color-divider)] pt-8">
        <p className="text-sm text-[var(--color-text-secondary)]">
          &copy; {new Date().getFullYear()} Matheus Felipe
        </p>
        <div className="flex items-center gap-4">
          {links.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
