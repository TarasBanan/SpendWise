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
        <BaseButton variant="primary" @click="openTransactionModal('income')">Add income</BaseButton>
        <BaseButton variant="surface" @click="openTransactionModal('expense')">Add expense</BaseButton>
        <p class="status-line">Last action: {{ lastAction }}</p>
      </CardPanel>
    </div>

    <CardPanel title="Expense feed">
      <p class="status-line" v-if="transactionsStore.userAddedItems.length === 0">Your expenses will appear here.</p>
      <ul class="list-reset" v-else>
        <li v-for="item in transactionsStore.userAddedItems" :key="item.id" class="list-row">
          <span>{{ item.title }}</span>
          <span>{{ formatCurrency(item.amount) }}</span>
          <span>{{ item.tag ?? item.type }}</span>
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

    <div v-if="transactionModalOpen" class="auth-modal" role="dialog" aria-modal="true" aria-label="Transaction settings">
      <div class="auth-modal__card">
        <h2 class="auth-modal__title">{{ transactionMode === 'income' ? 'Add income' : 'Add expense' }}</h2>

        <label class="auth-modal__label">
          Amount
          <input v-model="form.amount" class="auth-modal__input" type="number" min="1" />
        </label>

        <label class="auth-modal__label">
          Description
          <input v-model="form.description" class="auth-modal__input" type="text" />
        </label>

        <label class="auth-modal__label">
          Tag
          <select v-model="form.tag" class="auth-modal__input">
            <option value="Fuel">Fuel</option>
            <option value="Groceries">Groceries</option>
            <option value="Medicines">Medicines</option>
            <option value="Transport">Transport</option>
            <option value="Salary">Salary</option>
            <option value="Freelance">Freelance</option>
          </select>
        </label>

        <div class="button-row">
          <BaseButton variant="primary" @click="saveTransaction">Save</BaseButton>
          <BaseButton variant="outline" @click="closeTransactionModal">Cancel</BaseButton>
        </div>
      </div>
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
import type { Transaction } from '@/types'

const transactionsStore = useTransactionsStore()
const { formatCurrency } = useFormatCurrency()
const { formatDate } = useFormatDate()
const lastAction = ref('none')
const transactionModalOpen = ref(false)
const transactionMode = ref<'income' | 'expense'>('expense')

const form = ref({
  amount: '1000',
  description: '',
  tag: 'Groceries'
})

function openTransactionModal(mode: 'income' | 'expense'): void {
  transactionMode.value = mode
  transactionModalOpen.value = true
}

function closeTransactionModal(): void {
  transactionModalOpen.value = false
}

function saveTransaction(): void {
  const parsedAmount = Number(form.value.amount)
  if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
    return
  }

  const now = new Date()
  const day = `${now.getDate()}`.padStart(2, '0')
  const month = `${now.getMonth() + 1}`.padStart(2, '0')
  const year = `${now.getFullYear()}`

  const transaction: Transaction = {
    id: `manual-${now.getTime()}`,
    title: form.value.description || (transactionMode.value === 'income' ? 'Manual income' : 'Manual expense'),
    amount: parsedAmount,
    categoryId: transactionMode.value === 'income' ? 'salary' : 'custom-expense',
    date: `${year}-${month}-${day}`,
    type: transactionMode.value,
    description: form.value.description,
    tag: form.value.tag
  }

  transactionsStore.addTransaction(transaction)
  lastAction.value = transactionMode.value === 'income' ? 'add-income' : 'add-expense'
  transactionModalOpen.value = false
}
</script>
