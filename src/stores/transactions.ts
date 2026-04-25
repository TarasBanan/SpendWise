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

  function addQuickTransaction(type: 'income' | 'expense'): void {
    const now = new Date()
    const day = `${now.getDate()}`.padStart(2, '0')
    const month = `${now.getMonth() + 1}`.padStart(2, '0')
    const year = `${now.getFullYear()}`

    if (type === 'income') {
      addTransaction({
        id: `manual-income-${now.getTime()}`,
        title: 'Manual Income',
        amount: 25000,
        categoryId: 'salary',
        date: `${year}-${month}-${day}`,
        type: 'income'
      })
      return
    }

    addTransaction({
      id: `manual-expense-${now.getTime()}`,
      title: 'Manual Expense',
      amount: 3800,
      categoryId: 'other',
      date: `${year}-${month}-${day}`,
      type: 'expense'
    })
  }

  return { items, userAddedItems, totalIncome, totalExpense, setTransactions, addTransaction, addQuickTransaction }
})
