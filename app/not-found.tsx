import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-[var(--color-text-secondary)]">Pagina nao encontrada</p>
      <Link href="/" className="mt-6 inline-block text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]">
        Voltar para o inicio
      </Link>
    </div>
  )
}
