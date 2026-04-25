<template>
  <section class="page">
    <h1 class="page__title">Дашборд</h1>
    <div class="grid-two">
      <CardPanel title="Итоги месяца">
        <p>Доход: {{ formatCurrency(transactionsStore.totalIncome) }}</p>
        <p>Расход: {{ formatCurrency(transactionsStore.totalExpense) }}</p>
      </CardPanel>
      <CardPanel title="Быстрые действия">
        <BaseButton variant="primary" @click="lastAction = 'add-income'">Добавить доход</BaseButton>
        <BaseButton variant="surface" @click="lastAction = 'add-expense'">Добавить расход</BaseButton>
        <p class="status-line">Последнее действие: {{ lastAction }}</p>
      </CardPanel>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import CardPanel from '@/components/common/CardPanel.vue'
import { useFormatCurrency } from '@/composables/useFormatCurrency'
import { useTransactionsStore } from '@/stores/transactions'

const transactionsStore = useTransactionsStore()
const { formatCurrency } = useFormatCurrency()
const lastAction = ref('none')
</script>
