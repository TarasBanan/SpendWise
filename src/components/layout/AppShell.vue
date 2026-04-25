<template>
  <div :class="['app-shell', `app-shell--${settingsStore.state.theme}`]">
    <header class="app-shell__header">
      <div>
        <div class="app-shell__brand">SpendWise</div>
        <p class="status-line" v-if="authStore.currentUser">Signed in as {{ authStore.currentUser }}</p>
      </div>
      <nav class="app-shell__nav" aria-label="Main navigation">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" class="app-shell__nav-link">
          {{ item.label }}
        </RouterLink>
      </nav>
      <div class="button-row">
        <BaseButton variant="outline" @click="settingsStore.toggleTheme">Theme</BaseButton>
        <BaseButton variant="outline" @click="authStore.logout">Log out</BaseButton>
      </div>
    </header>

    <main class="app-shell__main">
      <RouterView />
    </main>

    <AuthModal />
  </div>
</template>

<script setup lang="ts">
import AuthModal from '@/components/common/AuthModal.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()
const authStore = useAuthStore()

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/transactions', label: 'Transactions' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/budgets', label: 'Budgets' },
  { to: '/goals', label: 'Goals' },
  { to: '/categories', label: 'Categories' },
  { to: '/settings', label: 'Settings' }
]
</script>
