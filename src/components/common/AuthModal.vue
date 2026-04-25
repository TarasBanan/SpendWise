<template>
  <div v-if="authStore.modalOpen" class="auth-modal" role="dialog" aria-modal="true" aria-label="Authentication">
    <div class="auth-modal__card">
      <h2 class="auth-modal__title">{{ authStore.mode === 'register' ? 'Create account' : 'Sign in' }}</h2>
      <p class="status-line" v-if="authStore.mode === 'register'">
        Registration is a preview. Demo login accounts are Anna and Max with password 123.
      </p>

      <div class="auth-modal__fields">
        <label class="auth-modal__label">
          Name
          <input v-model="username" class="auth-modal__input" type="text" />
        </label>
        <label class="auth-modal__label">
          Password
          <input v-model="password" class="auth-modal__input" type="password" />
        </label>
      </div>

      <BaseButton variant="primary" @click="submit">{{ authStore.mode === 'register' ? 'Register' : 'Log in' }}</BaseButton>
      <p v-if="authStore.loginError" class="auth-modal__error">{{ authStore.loginError }}</p>

      <button v-if="authStore.mode === 'register'" class="auth-modal__link" type="button" @click="authStore.openLogin">
        Already have an account?
      </button>
      <button v-else class="auth-modal__link" type="button" @click="authStore.openRegister">
        Need an account?
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const username = ref('Anna')
const password = ref('123')

async function submit(): Promise<void> {
  if (authStore.mode === 'register') {
    authStore.openLogin()
    return
  }

  await authStore.login(username.value.trim(), password.value)
}
</script>
