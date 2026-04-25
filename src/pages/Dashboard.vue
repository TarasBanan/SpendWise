<template>
  <section class="page">
    <h1 class="page__title">Dashboard</h1>

    <div class="grid-two">
      <CardPanel title="Monthly totals">
        <p>Income: {{ formatCurrency(transactionsStore.totalIncome) }}</p>
        <p>Expense: {{ formatCurrency(transactionsStore.totalExpense) }}</p>

        <h3 class="section-title">All records</h3>
        <ul class="list-reset" v-if="transactionsStore.items.length > 0">
          <li v-for="item in transactionsStore.items" :key="item.id" class="list-row">
            <span>{{ item.title }}</span>
            <span>{{ formatCurrency(item.amount) }}</span>
            <span>{{ formatDate(item.date) }}</span>
          </li>
        </ul>
      </CardPanel>

      <CardPanel title="Quick actions">
        <BaseButton variant="primary" @click="addIncome">Add income</BaseButton>
        <BaseButton variant="surface" @click="addExpense">Add expense</BaseButton>
        <p class="status-line">Last action: {{ lastAction }}</p>
      </CardPanel>
    </div>

    <CardPanel title="Expense feed">
      <p class="status-line" v-if="transactionsStore.userAddedItems.length === 0">Тут будут отображаться ваши расходы</p>
      <ul class="list-reset" v-else>
        <li v-for="item in transactionsStore.userAddedItems" :key="item.id" class="list-row">
          <span>{{ item.title }}</span>
          <span>{{ formatCurrency(item.amount) }}</span>
          <span>{{ item.type }}</span>
        </li>
      </ul>
    </CardPanel>

    <div class="grid-two">
      <CardPanel title="Planned widgets">
        <ul class="list-reset">
          <li class="list-item">Net worth timeline (placeholder)</li>
          <li class="list-item">Recurring payments tracker (placeholder)</li>
          <li class="list-item">Monthly trend cards (placeholder)</li>
        </ul>
      </CardPanel>
      <CardPanel title="Insights placeholder board">
        <p class="status-line">Top category trend, anomaly detection and savings streak will be shown here.</p>
        <p class="status-line">This section is intentionally filled to avoid empty page state.</p>
      </CardPanel>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import CardPanel from '@/components/common/CardPanel.vue'
import { useFormatCurrency } from '@/composables/useFormatCurrency'
import { useFormatDate } from '@/composables/useFormatDate'
import { useTransactionsStore } from '@/stores/transactions'

const transactionsStore = useTransactionsStore()
const { formatCurrency } = useFormatCurrency()
const { formatDate } = useFormatDate()
const lastAction = ref('none')

function addIncome(): void {
  transactionsStore.addQuickTransaction('income')
  lastAction.value = 'add-income'
}

function addExpense(): void {
  transactionsStore.addQuickTransaction('expense')
  lastAction.value = 'add-expense'
}
</script>
