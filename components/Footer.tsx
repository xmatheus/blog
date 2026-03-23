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
    <footer className="mx-auto max-w-2xl px-5 py-16">
      <div className="flex items-center justify-between">
        <span className="text-sm text-quaternary-color">
          &copy; {new Date().getFullYear()} Matheus Felipe
        </span>
        <div className="flex items-center gap-1">
          {links.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full text-quaternary-color transition-colors hover:text-primary-color hover-bg"
            >
              <Icon size={16} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
