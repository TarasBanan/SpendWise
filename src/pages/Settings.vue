<template>
  <section class="page">
    <h1 class="page__title">Настройки</h1>
    <CardPanel title="Параметры приложения">
      <div class="button-row">
        <BaseButton variant="outline" @click="settingsStore.state.currency = 'RUB'">RUB</BaseButton>
        <BaseButton variant="outline" @click="settingsStore.state.currency = 'USD'">USD</BaseButton>
        <BaseButton variant="outline" @click="settingsStore.state.currency = 'EUR'">EUR</BaseButton>
      </div>
      <BaseButton variant="primary" @click="settingsStore.toggleTheme">Переключить тему</BaseButton>
      <p class="status-line">Валюта: {{ settingsStore.state.currency }}</p>
      <p class="status-line">Тема: {{ settingsStore.state.theme }}</p>
    </CardPanel>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/common/BaseButton.vue'
import CardPanel from '@/components/common/CardPanel.vue'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()
</script>
