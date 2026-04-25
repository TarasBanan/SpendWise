<template>
  <section class="page">
    <h1 class="page__title">Транзакции</h1>
    <CardPanel title="Список операций">
      <ul class="list-reset">
        <li v-for="item in transactionsStore.items" :key="item.id" class="list-row">
          <span>{{ item.title }}</span>
          <span>{{ formatCurrency(item.amount) }}</span>
          <span>{{ formatDate(item.date) }}</span>
        </li>
      </ul>
      <div class="button-row">
        <BaseButton variant="primary" @click="filter = 'all'">Все</BaseButton>
        <BaseButton variant="outline" @click="filter = 'income'">Доходы</BaseButton>
        <BaseButton variant="outline" @click="filter = 'expense'">Расходы</BaseButton>
      </div>
      <p class="status-line">Фильтр: {{ filter }}</p>
    </CardPanel>
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
const filter = ref('all')
</script>
