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
      <p class="status-line">Range transactions: {{ rangedTransactions.length }}</p>
    </CardPanel>

    <div class="grid-two">
      <CardPanel title="Donut: income by category">
        <div class="chart-stack">
          <div class="donut-chart" :style="{ background: incomeDonutGradient }" />
          <ul class="list-reset">
            <li v-for="item in incomeCategoryTotals" :key="item.category" class="list-item">
              <span>{{ item.category }}</span>
              <span>{{ formatCurrency(item.amount) }}</span>
            </li>
          </ul>
        </div>
      </CardPanel>

      <CardPanel title="Donut: expenses by category">
        <div class="chart-stack">
          <div class="donut-chart" :style="{ background: expenseDonutGradient }" />
          <ul class="list-reset">
            <li v-for="item in expenseCategoryTotals" :key="item.category" class="list-item">
              <span>{{ item.category }}</span>
              <span>{{ formatCurrency(item.amount) }}</span>
            </li>
          </ul>
        </div>
      </CardPanel>
    </div>

    <CardPanel title="Bar chart: income vs expense by period">
      <div class="bar-chart-grid">
        <div v-for="bucket in periodBuckets" :key="bucket.label" class="bar-chart-row">
          <div class="bar-chart-label">{{ bucket.label }}</div>
          <div class="bar-chart-track">
            <div class="bar-chart-income" :style="{ width: `${getBarWidth(bucket.income, maxBarValue)}%` }" />
            <div class="bar-chart-expense" :style="{ width: `${getBarWidth(bucket.expense, maxBarValue)}%` }" />
          </div>
          <div class="bar-chart-values">
            <span>+ {{ formatCurrency(bucket.income) }}</span>
            <span>- {{ formatCurrency(bucket.expense) }}</span>
          </div>
        </div>
      </div>
    </CardPanel>

    <div class="grid-two">
      <CardPanel title="Cashflow trend (extra chart)">
        <div class="trend-grid">
          <div v-for="bucket in periodBuckets" :key="`trend-${bucket.label}`" class="trend-item">
            <div class="trend-item__label">{{ bucket.label }}</div>
            <div class="trend-item__value">{{ formatCurrency(bucket.income - bucket.expense) }}</div>
          </div>
        </div>
      </CardPanel>

      <CardPanel title="Savings rate gauge (extra chart)">
        <p class="status-line">Savings rate: {{ savingsRateLabel }}</p>
        <div class="gauge-track">
          <div class="gauge-fill" :style="{ width: `${savingsRatePercent}%` }" />
        </div>
        <p class="status-line">Income: {{ formatCurrency(incomeTotal) }}</p>
        <p class="status-line">Expense: {{ formatCurrency(expenseTotal) }}</p>
        <p class="status-line">Net balance: {{ formatCurrency(incomeTotal - expenseTotal) }}</p>
      </CardPanel>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import CardPanel from '@/components/common/CardPanel.vue'
import { useFormatCurrency } from '@/composables/useFormatCurrency'
import { useTransactionsStore } from '@/stores/transactions'

interface CategoryAmount {
  category: string
  amount: number
}

const chartColors = [
  'var(--color-ink)',
  'var(--color-muted)',
  'rgba(28, 28, 28, 0.4)',
  'rgba(28, 28, 28, 0.25)',
  'rgba(28, 28, 28, 0.12)'
]

const range = ref<'month' | 'quarter' | 'year'>('month')
const transactionsStore = useTransactionsStore()
const { formatCurrency } = useFormatCurrency()

const latestTransactionDate = computed(() => {
  if (transactionsStore.items.length === 0) {
    return new Date()
  }

  const max = [...transactionsStore.items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
  return new Date(max.date)
})

const rangedTransactions = computed(() => {
  const baseDate = latestTransactionDate.value
  const startDate = new Date(baseDate)

  if (range.value === 'month') {
    startDate.setMonth(baseDate.getMonth() - 1)
  }

  if (range.value === 'quarter') {
    startDate.setMonth(baseDate.getMonth() - 3)
  }

  if (range.value === 'year') {
    startDate.setFullYear(baseDate.getFullYear() - 1)
  }

  return transactionsStore.items.filter((item) => new Date(item.date).getTime() >= startDate.getTime())
})

const incomeTransactions = computed(() => rangedTransactions.value.filter((item) => item.type === 'income'))
const expenseTransactions = computed(() => rangedTransactions.value.filter((item) => item.type === 'expense'))

const incomeTotal = computed(() => incomeTransactions.value.reduce((sum, item) => sum + item.amount, 0))
const expenseTotal = computed(() => expenseTransactions.value.reduce((sum, item) => sum + item.amount, 0))

const incomeCategoryTotals = computed(() => buildCategoryTotals(incomeTransactions.value))
const expenseCategoryTotals = computed(() => buildCategoryTotals(expenseTransactions.value))

const incomeDonutGradient = computed(() => buildDonutGradient(incomeCategoryTotals.value))
const expenseDonutGradient = computed(() => buildDonutGradient(expenseCategoryTotals.value))

const periodBuckets = computed(() => {
  const bucketMap = new Map<string, { income: number; expense: number }>()

  for (const item of rangedTransactions.value) {
    const date = new Date(item.date)
    const label = `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, '0')}`
    const existing = bucketMap.get(label) ?? { income: 0, expense: 0 }

    if (item.type === 'income') {
      existing.income += item.amount
    }

    if (item.type === 'expense') {
      existing.expense += item.amount
    }

    bucketMap.set(label, existing)
  }

  return [...bucketMap.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([label, values]) => ({ label, income: values.income, expense: values.expense }))
})

const maxBarValue = computed(() => {
  const values = periodBuckets.value.flatMap((bucket) => [bucket.income, bucket.expense])
  if (values.length === 0) {
    return 1
  }

  const max = Math.max(...values)
  return max > 0 ? max : 1
})

const savingsRatePercent = computed(() => {
  if (incomeTotal.value <= 0) {
    return 0
  }

  const rate = ((incomeTotal.value - expenseTotal.value) / incomeTotal.value) * 100
  if (rate < 0) {
    return 0
  }

  if (rate > 100) {
    return 100
  }

  return Math.round(rate)
})

const savingsRateLabel = computed(() => `${savingsRatePercent.value}%`)

function getBarWidth(value: number, maxValue: number): number {
  if (maxValue <= 0) {
    return 0
  }

  return (value / maxValue) * 100
}

function buildCategoryTotals(items: { categoryId: string; amount: number }[]): CategoryAmount[] {
  const map = new Map<string, number>()

  for (const item of items) {
    const previous = map.get(item.categoryId) ?? 0
    map.set(item.categoryId, previous + item.amount)
  }

  return [...map.entries()].map(([category, amount]) => ({ category, amount })).sort((a, b) => b.amount - a.amount)
}

function buildDonutGradient(items: CategoryAmount[]): string {
  if (items.length === 0) {
    return 'conic-gradient(var(--color-border-soft) 0deg 360deg)'
  }

  const total = items.reduce((sum, item) => sum + item.amount, 0)
  let current = 0
  const slices: string[] = []

  for (const [index, item] of items.entries()) {
    const color = chartColors[index % chartColors.length]
    const start = current
    const end = current + (item.amount / total) * 360
    slices.push(`${color} ${start}deg ${end}deg`)
    current = end
  }

  return `conic-gradient(${slices.join(', ')})`
}
</script>
