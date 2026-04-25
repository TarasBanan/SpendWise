import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Budget } from '@/types'

export const useBudgetsStore = defineStore('budgets', () => {
  const items = ref<Budget[]>([])

  const utilization = computed(() => items.value.map((item) => ({ ...item, ratio: item.limit === 0 ? 0 : item.spent / item.limit })))

  function setBudgets(budgets: Budget[]): void {
    items.value = budgets
  }

  return { items, utilization, setBudgets }
})
