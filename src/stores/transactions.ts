import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Transaction } from '@/types'

export const useTransactionsStore = defineStore('transactions', () => {
  const items = ref<Transaction[]>([
    {
      id: 'tx-1',
      title: 'Зарплата',
      amount: 180000,
      categoryId: 'salary',
      date: '2026-04-10',
      type: 'income'
    },
    {
      id: 'tx-2',
      title: 'Продукты',
      amount: 9500,
      categoryId: 'food',
      date: '2026-04-11',
      type: 'expense'
    }
  ])

  const totalIncome = computed(() => items.value.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0))
  const totalExpense = computed(() => items.value.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0))

  function addTransaction(transaction: Transaction): void {
    items.value.unshift(transaction)
  }

  return { items, totalIncome, totalExpense, addTransaction }
})
