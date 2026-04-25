<template>
  <section class="page">
    <h1 class="page__title">Budgets</h1>
    <CardPanel title="Limits overview">
      <ul class="list-reset">
        <li v-for="item in budgetsStore.utilization" :key="item.id" class="list-row">
          <span>{{ item.categoryId }}</span>
          <span>{{ formatCurrency(item.spent) }} / {{ formatCurrency(item.limit) }}</span>
          <span>{{ Math.round(item.ratio * 100) }}%</span>
        </li>
      </ul>
      <BaseButton variant="primary" @click="notification = 'checked'">Check overages</BaseButton>
      <p class="status-line">Status: {{ notification }}</p>
    </CardPanel>

    <div class="grid-two">
      <CardPanel title="Budget planner placeholder">
        <ul class="list-reset">
          <li class="list-item">Recommended limits by spending history</li>
          <li class="list-item">Auto-carry leftovers to next month</li>
          <li class="list-item">Alert schedule setup</li>
        </ul>
      </CardPanel>
      <CardPanel title="Team budget placeholder">
        <p class="status-line">Shared household budget controls will be rendered here later.</p>
      </CardPanel>
    </div>
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
