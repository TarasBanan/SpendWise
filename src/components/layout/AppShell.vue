<template>
  <div :class="['app-shell', `app-shell--${settingsStore.state.theme}`]">
    <header class="app-shell__header">
      <div class="app-shell__brand">SpendWise</div>
      <nav class="app-shell__nav" aria-label="Главная навигация">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" class="app-shell__nav-link">
          {{ item.label }}
        </RouterLink>
      </nav>
      <BaseButton variant="outline" @click="settingsStore.toggleTheme">Тема</BaseButton>
    </header>

    <main class="app-shell__main">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/common/BaseButton.vue'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()

const navItems = [
  { to: '/', label: 'Дашборд' },
  { to: '/transactions', label: 'Транзакции' },
  { to: '/analytics', label: 'Аналитика' },
  { to: '/budgets', label: 'Бюджеты' },
  { to: '/goals', label: 'Цели' },
  { to: '/categories', label: 'Категории' },
  { to: '/settings', label: 'Настройки' }
]
</script>
