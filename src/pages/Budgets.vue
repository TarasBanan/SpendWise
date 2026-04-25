<template>
  <section class="page">
    <h1 class="page__title">Бюджеты</h1>
    <CardPanel title="Лимиты">
      <ul class="list-reset">
        <li v-for="item in budgetsStore.utilization" :key="item.id" class="list-row">
          <span>{{ item.categoryId }}</span>
          <span>{{ formatCurrency(item.spent) }} / {{ formatCurrency(item.limit) }}</span>
        </li>
      </ul>
      <BaseButton variant="primary" @click="notification = 'checked'">Проверить превышения</BaseButton>
      <p class="status-line">Статус: {{ notification }}</p>
    </CardPanel>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import CardPanel from '@/components/common/CardPanel.vue'
import { useFormatCurrency } from '@/composables/useFormatCurrency'
import { useBudgetsStore } from '@/stores/budgets'

const budgetsStore = useBudgetsStore()
const { formatCurrency } = useFormatCurrency()
const notification = ref('idle')
</script>
