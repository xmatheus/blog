'use client'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="py-24 text-center">
      <h1 className="text-4xl font-bold">Algo deu errado</h1>
      <p className="mt-4 text-[var(--color-text-secondary)]">Ocorreu um erro inesperado.</p>
      <button onClick={reset} className="mt-6 rounded-md bg-[var(--color-accent)] px-4 py-2 text-white transition-colors hover:bg-[var(--color-accent-hover)]">
        Tentar novamente
      </button>
    </div>
  )
}
