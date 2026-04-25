import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Category } from '@/types'

export const useCategoriesStore = defineStore('categories', () => {
  const items = ref<Category[]>([])

  function setCategories(categories: Category[]): void {
    items.value = categories
  }

  function addCategory(category: Category): void {
    items.value.push(category)
  }

  return { items, setCategories, addCategory }
})
