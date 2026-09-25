export const SITE = {
  url: 'https://xmatheus.dev',
  name: 'Matheus Felipe',
  title: 'Matheus Felipe · Full Stack Developer',
  titleTemplate: (title: string) => `${title} · Matheus Felipe`,
  description:
    'Site pessoal e blog de Matheus Felipe, desenvolvedor Full Stack especializado em JavaScript, React e Node.js',
  locale: 'pt_BR',
  lang: 'pt-BR',
  ogImage: { url: '/seo/og-image.png', width: 1200, height: 630 },
}

export const AUTHOR = {
  name: 'Matheus Felipe',
  fullName: 'Matheus Felipe Teodoro Correia',
  role: 'Full Stack Developer',
  bio: 'Mais um desenvolvedor com seu portfólio, seus projetos e posts... Sobre minha formação: me graduei em Ciência da Computação pela UFMT. No dia a dia construo aplicações web com JavaScript, React e Node.js. As vezes volto a mexer com Python, C e problemas de programação dinâmica. Aos finais de semana restauro meu Opala 1990, pelo menos ele só tem problemas e não bugs :)',
  github: 'https://github.com/xmatheus',
  instagram: 'https://www.instagram.com/matheus.ftc/',
  email: 'matheuscorreia559@gmail.com',
  dribbble: 'https://dribbble.com/xmatheus',
}

export const SKILLS = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'C']

export const SOCIAL_LINKS = [
  { href: AUTHOR.github, icon: 'github', label: 'GitHub' },
  { href: AUTHOR.instagram, icon: 'instagram', label: 'Instagram' },
  { href: `mailto:${AUTHOR.email}`, icon: 'mail', label: 'Email' },
  { href: AUTHOR.dribbble, icon: 'dribbble', label: 'Dribbble' },
] as const

export const NAV_LINKS = [
  { href: '/', label: 'Blog', external: false },
  { href: AUTHOR.github, label: 'GitHub', external: true },
]
