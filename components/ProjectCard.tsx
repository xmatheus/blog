import { ExternalLink } from 'lucide-react'

interface Project {
  title: string
  description: string
  tags: string[]
  link: string
  featured?: boolean
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-lg border border-[var(--color-divider)] p-4 transition-colors hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-surface)]"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold">
          {project.title.charAt(0)}
        </div>
        <ExternalLink size={14} className="text-[var(--color-text-secondary)] opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <h3 className="mt-3 font-bold group-hover:text-[var(--color-accent)]">{project.title}</h3>
      <p className="mt-1 text-sm text-[var(--color-text-secondary)] line-clamp-2">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <span key={tag} className="text-xs text-[var(--color-text-secondary)] bg-[var(--color-divider)] px-2 py-0.5 rounded-full">{tag}</span>
        ))}
      </div>
    </a>
  )
}
