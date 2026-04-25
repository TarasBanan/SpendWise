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
      <BaseButton variant="outline" @click="forecast = 'updated'">Update forecast</BaseButton>
      <p class="status-line">Forecast: {{ forecast }}</p>
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
const forecast = ref('idle')
</script>
