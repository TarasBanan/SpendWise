<template>
  <section class="page">
    <h1 class="page__title">Analytics</h1>
    <CardPanel title="Range selection">
      <div class="button-row">
        <BaseButton variant="surface" @click="range = 'month'">Month</BaseButton>
        <BaseButton variant="surface" @click="range = 'quarter'">Quarter</BaseButton>
        <BaseButton variant="surface" @click="range = 'year'">Year</BaseButton>
      </div>
      <p class="status-line">Selected range: {{ range }}</p>
    </CardPanel>

    <div class="grid-two">
      <CardPanel title="Income vs expense">
        <p>Income total: {{ formatCurrency(incomeTotal) }}</p>
        <p>Expense total: {{ formatCurrency(expenseTotal) }}</p>
        <p>Net balance: {{ formatCurrency(incomeTotal - expenseTotal) }}</p>
      </CardPanel>
      <CardPanel title="Top expense categories">
        <ul class="list-reset">
          <li v-for="item in expenseByCategory" :key="item.category" class="list-item">
            {{ item.category }} — {{ formatCurrency(item.amount) }}
          </li>
        </ul>
      </CardPanel>
    </div>

    <CardPanel title="Quick insights">
      <p class="status-line">Highest expense transaction: {{ highestExpenseTitle }}</p>
      <p class="status-line">Transactions count: {{ transactionsStore.items.length }}</p>
      <p class="status-line">Average expense: {{ formatCurrency(averageExpense) }}</p>
    </CardPanel>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import CardPanel from '@/components/common/CardPanel.vue'
import { useFormatCurrency } from '@/composables/useFormatCurrency'
import { useTransactionsStore } from '@/stores/transactions'

const range = ref('month')
const transactionsStore = useTransactionsStore()
const { formatCurrency } = useFormatCurrency()

const incomeTotal = computed(() =>
  transactionsStore.items.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0)
)

const expenseTransactions = computed(() => transactionsStore.items.filter((item) => item.type === 'expense'))

const expenseTotal = computed(() => expenseTransactions.value.reduce((sum, item) => sum + item.amount, 0))

const expenseByCategory = computed(() => {
  const map = new Map<string, number>()

  for (const item of expenseTransactions.value) {
    const previous = map.get(item.categoryId) ?? 0
    map.set(item.categoryId, previous + item.amount)
  }

  return [...map.entries()].map(([category, amount]) => ({ category, amount })).sort((a, b) => b.amount - a.amount)
})

const highestExpenseTitle = computed(() => {
  if (expenseTransactions.value.length === 0) {
    return 'No expenses yet'
  }

  const highest = [...expenseTransactions.value].sort((a, b) => b.amount - a.amount)[0]
  return `${highest.title} (${formatCurrency(highest.amount)})`
})

const averageExpense = computed(() => {
  if (expenseTransactions.value.length === 0) {
    return 0
  }

  return expenseTotal.value / expenseTransactions.value.length
})
</script>
