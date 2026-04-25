<template>
  <section class="page">
    <h1 class="page__title">Transactions</h1>
    <CardPanel title="Operations list">
      <ul class="list-reset">
        <li v-for="item in filteredItems" :key="item.id" class="list-row">
          <span>{{ item.title }}</span>
          <span>{{ formatCurrency(item.amount) }}</span>
          <span>{{ formatDate(item.date) }}</span>
        </li>
      </ul>
      <div class="button-row">
        <BaseButton variant="primary" @click="filter = 'all'">All</BaseButton>
        <BaseButton variant="outline" @click="filter = 'income'">Income</BaseButton>
        <BaseButton variant="outline" @click="filter = 'expense'">Expense</BaseButton>
      </div>
      <p class="status-line">Filter: {{ filter }}</p>
      <p class="status-line">Shown records: {{ filteredItems.length }}</p>
    </CardPanel>

    <div class="grid-two">
      <CardPanel title="Upcoming features placeholder">
        <ul class="list-reset">
          <li class="list-item">Advanced search by merchant</li>
          <li class="list-item">Bulk edit for selected transactions</li>
          <li class="list-item">Smart duplicate detection</li>
        </ul>
      </CardPanel>
      <CardPanel title="Import placeholder">
        <p class="status-line">CSV and bank statement import wizard will be displayed in this area.</p>
      </CardPanel>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import CardPanel from '@/components/common/CardPanel.vue'
import { useFormatCurrency } from '@/composables/useFormatCurrency'
import { useFormatDate } from '@/composables/useFormatDate'
import { useTransactionsStore } from '@/stores/transactions'

const transactionsStore = useTransactionsStore()
const { formatCurrency } = useFormatCurrency()
const { formatDate } = useFormatDate()
const filter = ref<'all' | 'income' | 'expense'>('all')

const filteredItems = computed(() => {
  if (filter.value === 'all') {
    return transactionsStore.items
  }

  return transactionsStore.items.filter((item) => item.type === filter.value)
})
</script>
