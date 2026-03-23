import Image from 'next/image'
import { Github, Instagram, Mail, Dribbble } from 'lucide-react'
import { getAllPosts } from '@/lib/posts'
import { AUTHOR } from '@/lib/constants'
import PostCard from '@/components/PostCard'
import ProjectCard from '@/components/ProjectCard'
import projects from '@/content/projects.json'

const socialLinks = [
  { href: AUTHOR.github, icon: Github, label: 'GitHub' },
  { href: AUTHOR.instagram, icon: Instagram, label: 'Instagram' },
  { href: `mailto:${AUTHOR.email}`, icon: Mail, label: 'Email' },
  { href: AUTHOR.dribbble, icon: Dribbble, label: 'Dribbble' },
]

const skills = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'C']

export default function Home() {
  const posts = getAllPosts()
  const featuredProjects = projects.filter((p: { featured?: boolean }) => p.featured)

  return (
    <div className="flex flex-col gap-16">
      {/* Hero */}
      <section className="flex flex-col gap-5 animate-in">
        <div className="flex items-center gap-4">
          <Image
            src="/eu.webp"
            alt="Matheus Felipe"
            width={56}
            height={56}
            className="rounded-full"
            priority
          />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{AUTHOR.role}</h1>
            <p className="text-sm text-secondary-color">Matheus Felipe</p>
          </div>
        </div>
        <p className="text-secondary-color leading-relaxed text-pretty animate-in delay-1">
          {AUTHOR.bio}
        </p>

        <div className="flex flex-wrap gap-2 animate-in delay-2">
          {skills.map(skill => (
            <span
              key={skill}
              className="text-xs font-medium text-tertiary-color border border-subtle px-2.5 py-1 rounded-full transition-colors hover:text-secondary-color hover:border-[var(--color-tertiary)]"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1 animate-in delay-3">
          {socialLinks.map(({ href, icon: Icon, label }) => (
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
      </section>

      {/* Projects */}
      {featuredProjects.length > 0 && (
        <section className="flex flex-col gap-4 animate-in delay-2">
          <h2 className="text-sm font-medium text-secondary-color">Projetos</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {featuredProjects.map((project: { title: string; description: string; tags: string[]; link: string; featured?: boolean }) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Posts */}
      <section className="flex flex-col gap-4 animate-in delay-3">
        <h2 className="text-sm font-medium text-secondary-color">Posts</h2>
        <div className="flex flex-col gap-0.5">
          {posts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}
