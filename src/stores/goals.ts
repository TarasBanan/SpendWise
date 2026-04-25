import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Goal } from '@/types'

export const useGoalsStore = defineStore('goals', () => {
  const items = ref<Goal[]>([
    { id: 'goal-1', title: 'Резервный фонд', target: 500000, current: 120000, dueDate: '2026-12-31' }
  ])

  const progress = computed(() => items.value.map((item) => ({ ...item, ratio: item.target === 0 ? 0 : item.current / item.target })))

  return { items, progress }
})
