<template>
  <section class="page">
    <h1 class="page__title">Цели</h1>
    <CardPanel title="Цели накоплений">
      <ul class="list-reset">
        <li v-for="item in goalsStore.progress" :key="item.id" class="list-row">
          <span>{{ item.title }}</span>
          <span>{{ Math.round(item.ratio * 100) }}%</span>
        </li>
      </ul>
      <BaseButton variant="outline" @click="forecast = 'updated'">Обновить прогноз</BaseButton>
      <p class="status-line">Прогноз: {{ forecast }}</p>
    </CardPanel>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import CardPanel from '@/components/common/CardPanel.vue'
import { useGoalsStore } from '@/stores/goals'

const goalsStore = useGoalsStore()
const forecast = ref('idle')
</script>
