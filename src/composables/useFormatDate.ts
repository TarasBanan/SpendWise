export function useFormatDate() {
  function formatDate(value: string): string {
    return new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(value))
  }

  return { formatDate }
}
