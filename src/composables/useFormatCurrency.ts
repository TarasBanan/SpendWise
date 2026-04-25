import { computed } from 'vue'
import { useSettingsStore } from '@/stores/settings'

export function useFormatCurrency() {
  const settingsStore = useSettingsStore()

  const currency = computed(() => settingsStore.state.currency)

  function formatCurrency(value: number): string {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: currency.value,
      maximumFractionDigits: 0
    }).format(value)
  }

  return { formatCurrency }
}
