'use client'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4 animate-in">
      <h1 className="text-2xl font-semibold">Algo deu errado</h1>
      <p className="text-secondary-color">Ocorreu um erro inesperado.</p>
      <button
        onClick={reset}
        className="mt-4 rounded-full px-4 py-2 text-sm font-medium transition-colors hover-bg border border-subtle"
      >
        Tentar novamente
      </button>
    </div>
  )
}
