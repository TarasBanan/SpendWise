<template>
  <section class="page">
    <h1 class="page__title">Goals</h1>
    <CardPanel title="Savings goals">
      <ul class="list-reset">
        <li v-for="item in goalsStore.progress" :key="item.id" class="list-row">
          <span>{{ item.title }}</span>
          <span>{{ Math.round(item.ratio * 100) }}%</span>
          <span>{{ formatDate(item.dueDate) }}</span>
        </li>
      </ul>
      <BaseButton variant="outline" @click="modalOpen = true">Add goal</BaseButton>
      <p class="status-line">Status: {{ state }}</p>
    </CardPanel>

    <div class="grid-two">
      <CardPanel title="Goal ideas placeholder">
        <ul class="list-reset">
          <li class="list-item">Vacation fund calculator</li>
          <li class="list-item">Emergency fund milestone tracker</li>
          <li class="list-item">Annual purchase readiness</li>
        </ul>
      </CardPanel>
      <CardPanel title="Projection notes placeholder">
        <p class="status-line">This area will include automatic contribution recommendations.</p>
      </CardPanel>
    </div>

    <div v-if="modalOpen" class="auth-modal" role="dialog" aria-modal="true" aria-label="Add goal">
      <div class="auth-modal__card">
        <h2 class="auth-modal__title">Add goal</h2>

        <label class="auth-modal__label">
          Goal title
          <input v-model="form.title" class="auth-modal__input" type="text" />
        </label>

        <label class="auth-modal__label">
          Target amount
          <input v-model="form.target" class="auth-modal__input" type="number" min="1" />
        </label>

        <label class="auth-modal__label">
          Due date
          <input v-model="form.dueDate" class="auth-modal__input" type="date" />
        </label>

        <div class="button-row">
          <BaseButton variant="primary" @click="saveGoal">Save</BaseButton>
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
import { useFormatDate } from '@/composables/useFormatDate'
import { useGoalsStore } from '@/stores/goals'

const goalsStore = useGoalsStore()
const { formatDate } = useFormatDate()
const state = ref('idle')
const modalOpen = ref(false)
const form = ref({ title: '', target: '10000', dueDate: '2026-12-31' })

function saveGoal(): void {
  const target = Number(form.value.target)
  if (form.value.title.trim().length === 0 || Number.isNaN(target) || target <= 0) {
    return
  }

  goalsStore.items.unshift({
    id: `goal-${Date.now()}`,
    title: form.value.title,
    target,
    current: 0,
    dueDate: form.value.dueDate
  })

  modalOpen.value = false
  state.value = 'goal-added'
  form.value.title = ''
}
</script>
