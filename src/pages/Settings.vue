<template>
  <section class="page">
    <h1 class="page__title">Settings</h1>
    <CardPanel title="Application preferences">
      <div class="button-row">
        <BaseButton variant="outline" @click="settingsStore.state.currency = 'RUB'">RUB</BaseButton>
        <BaseButton variant="outline" @click="settingsStore.state.currency = 'USD'">USD</BaseButton>
        <BaseButton variant="outline" @click="settingsStore.state.currency = 'EUR'">EUR</BaseButton>
      </div>
      <BaseButton variant="primary" @click="settingsStore.toggleTheme">Toggle theme</BaseButton>
      <p class="status-line">Currency: {{ settingsStore.state.currency }}</p>
      <p class="status-line">Theme: {{ settingsStore.state.theme }}</p>
    </CardPanel>

    <div class="grid-two">
      <CardPanel title="Export placeholder">
        <ul class="list-reset">
          <li class="list-item">CSV export options</li>
          <li class="list-item">XLSX export options</li>
          <li class="list-item">Backup scheduling</li>
        </ul>
      </CardPanel>
      <CardPanel title="Security placeholder">
        <p class="status-line">Password rotation and session control settings will be shown here.</p>
      </CardPanel>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/common/BaseButton.vue'
import CardPanel from '@/components/common/CardPanel.vue'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()
</script>
