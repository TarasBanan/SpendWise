<template>
  <section class="page">
    <h1 class="page__title">Аналитика</h1>
    <CardPanel title="Диапазон анализа">
      <div class="button-row">
        <BaseButton variant="surface" @click="range = 'month'">Месяц</BaseButton>
        <BaseButton variant="surface" @click="range = 'quarter'">Квартал</BaseButton>
        <BaseButton variant="surface" @click="range = 'year'">Год</BaseButton>
      </div>
      <p class="status-line">Выбранный диапазон: {{ range }}</p>
    </CardPanel>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import CardPanel from '@/components/common/CardPanel.vue'

const range = ref('month')
</script>
