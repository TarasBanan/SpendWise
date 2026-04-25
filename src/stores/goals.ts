import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Goal } from '@/types'

export const useGoalsStore = defineStore('goals', () => {
  const items = ref<Goal[]>([])

  const progress = computed(() => items.value.map((item) => ({ ...item, ratio: item.target === 0 ? 0 : item.current / item.target })))

  function setGoals(goals: Goal[]): void {
    items.value = goals
  }

  return { items, progress, setGoals }
})
