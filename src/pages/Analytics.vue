<template>
  <section class="page">
    <h1 class="page__title">Analytics</h1>
    <CardPanel title="Range selection">
      <div class="button-row">
        <BaseButton variant="surface" @click="range = 'month'">Month</BaseButton>
        <BaseButton variant="surface" @click="range = 'quarter'">Quarter</BaseButton>
        <BaseButton variant="surface" @click="range = 'year'">Year</BaseButton>
      </div>
      <p class="status-line">Selected range: {{ range }}</p>
    </CardPanel>

    <div class="grid-two">
      <CardPanel title="Charts placeholder">
        <ul class="list-reset">
          <li class="list-item">Pie chart by category</li>
          <li class="list-item">Income vs expense bars</li>
          <li class="list-item">Trend line by week</li>
        </ul>
      </CardPanel>
      <CardPanel title="Comparative analysis placeholder">
        <p class="status-line">Period-over-period variance and anomaly cards will appear here.</p>
      </CardPanel>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import CardPanel from '@/components/common/CardPanel.vue'

const range = ref('month')
</script>
