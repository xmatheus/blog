export interface Project {
  title: string
  description: string
  tags: string[]
  link: string
  featured?: boolean
}

export const PROJECTS: Project[] = [
  {
    title: 'Blog Pessoal',
    description: 'Site pessoal e blog construído com Astro, Tailwind CSS e Markdown',
    tags: ['Astro', 'Tailwind CSS', 'TypeScript'],
    link: 'https://github.com/xmatheus/blog',
    featured: true
  },
  {
    title: 'Barra Turismo',
    description: 'Site de turismo para Barra do Garças, MT. De 600 para 10 mil impressões diárias no Google em 12 meses',
    tags: ['Next.js', 'SEO', 'React', 'Vercel'],
    link: 'https://barraturismo.com',
    featured: true
  },
  {
    title: 'Dr. Leilão',
    description: 'Agregador de imóveis de leilão da Caixa',
    tags: ['Next.js', 'Supabase'],
    link: 'https://drleilao.com',
    featured: true
  }
]
