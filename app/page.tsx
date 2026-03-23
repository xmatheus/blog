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

const skills = ['JavaScript', 'React', 'Node.js', 'Python', 'C']

export default function Home() {
  const posts = getAllPosts()
  const featuredProjects = projects.filter((p: { featured?: boolean }) => p.featured)

  return (
    <>
      <section className="py-8">
        <h1 className="text-3xl font-bold">{AUTHOR.name}</h1>
        <p className="mt-1 text-[var(--color-accent)]">{AUTHOR.role}</p>
        <p className="mt-3 text-[var(--color-text-secondary)] leading-relaxed">{AUTHOR.bio}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map(skill => (
            <span key={skill} className="text-xs border border-[var(--color-divider)] px-2.5 py-1 rounded-full text-[var(--color-text-secondary)]">{skill}</span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]">
              <Icon size={18} />
            </a>
          ))}
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section className="py-8 border-t border-[var(--color-divider)]">
          <h2 className="text-xl font-bold">Projetos</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {featuredProjects.map((project: { title: string; description: string; tags: string[]; link: string; featured?: boolean }) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>
      )}

      <section className="py-8 border-t border-[var(--color-divider)]">
        <h2 className="text-xl font-bold">Posts</h2>
        <div className="mt-4 space-y-1">
          {posts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  )
}
