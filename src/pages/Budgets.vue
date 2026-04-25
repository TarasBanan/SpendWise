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
      <BaseButton variant="primary" @click="modalOpen = true">Configure budgets</BaseButton>
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

    <div v-if="modalOpen" class="auth-modal" role="dialog" aria-modal="true" aria-label="Configure budgets">
      <div class="auth-modal__card">
        <h2 class="auth-modal__title">Configure budgets</h2>

        <label class="auth-modal__label">
          Category ID
          <input v-model="form.categoryId" class="auth-modal__input" type="text" />
        </label>

        <label class="auth-modal__label">
          Monthly limit
          <input v-model="form.limit" class="auth-modal__input" type="number" min="1" />
        </label>

        <div class="button-row">
          <BaseButton variant="primary" @click="saveBudget">Save</BaseButton>
          <BaseButton variant="outline" @click="modalOpen = false">Cancel</BaseButton>
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
import { useBudgetsStore } from '@/stores/budgets'

const budgetsStore = useBudgetsStore()
const { formatCurrency } = useFormatCurrency()
const modalOpen = ref(false)
const form = ref({ categoryId: '', limit: '10000' })

function saveBudget(): void {
  const limit = Number(form.value.limit)
  if (form.value.categoryId.trim().length === 0 || Number.isNaN(limit) || limit <= 0) {
    return
  }

  budgetsStore.items.unshift({
    id: `budget-${Date.now()}`,
    categoryId: form.value.categoryId,
    limit,
    spent: 0
  })

  modalOpen.value = false
  form.value.categoryId = ''
}
</script>
