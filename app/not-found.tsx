import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4 animate-in">
      <h1 className="text-6xl font-semibold tracking-tighter text-quaternary-color">404</h1>
      <p className="text-secondary-color">Pagina nao encontrada</p>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-quaternary-color transition-colors hover:text-primary-color group mt-4"
      >
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
        Voltar para o inicio
      </Link>
    </div>
  )
}
