function parseDate(dateStr: string): Date {
  return new Date(`${dateStr}T00:00:00`)
}

/** "31 de jul. de 2021" */
export function formatShortDate(dateStr: string): string {
  return parseDate(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

/** "31 de julho de 2021" */
export function formatLongDate(dateStr: string): string {
  return parseDate(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}
