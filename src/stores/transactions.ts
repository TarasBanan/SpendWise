import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Transaction } from '@/types'

export const useTransactionsStore = defineStore('transactions', () => {
  const items = ref<Transaction[]>([])
  const userAddedItems = ref<Transaction[]>([])

  const totalIncome = computed(() => items.value.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0))
  const totalExpense = computed(() => items.value.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0))

  function setTransactions(transactions: Transaction[]): void {
    items.value = transactions
    userAddedItems.value = []
  }

  function addTransaction(transaction: Transaction): void {
    items.value.unshift(transaction)
    userAddedItems.value.unshift(transaction)
  }

  return { items, userAddedItems, totalIncome, totalExpense, setTransactions, addTransaction }
})
