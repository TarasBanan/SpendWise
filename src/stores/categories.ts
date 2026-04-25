import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Category } from '@/types'

export const useCategoriesStore = defineStore('categories', () => {
  const items = ref<Category[]>([
    { id: 'salary', name: 'Доход', icon: '💼', colorToken: 'var(--color-ink)' },
    { id: 'food', name: 'Еда', icon: '🛒', colorToken: 'var(--color-muted)' }
  ])

  function addCategory(category: Category): void {
    items.value.push(category)
  }

  return { items, addCategory }
})
