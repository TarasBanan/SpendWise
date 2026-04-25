import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { SettingsState } from '@/types'

export const useSettingsStore = defineStore('settings', () => {
  const state = ref<SettingsState>({
    currency: 'RUB',
    theme: 'dark'
  })

  function toggleTheme(): void {
    state.value.theme = state.value.theme === 'dark' ? 'light' : 'dark'
  }

  return { state, toggleTheme }
})
