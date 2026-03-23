import { ArrowUpRight } from 'lucide-react'

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
      className="group block rounded-xl border border-subtle p-4 transition-all duration-200 hover-bg"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-primary-color group-hover:underline underline-offset-2">
          {project.title}
        </h3>
        <ArrowUpRight
          size={14}
          className="mt-0.5 shrink-0 text-quaternary-color transition-all group-hover:text-primary-color group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
      <p className="mt-1.5 text-sm text-secondary-color leading-relaxed line-clamp-2">
        {project.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tags.map(tag => (
          <span
            key={tag}
            className="text-[11px] text-tertiary-color font-mono"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  )
}
