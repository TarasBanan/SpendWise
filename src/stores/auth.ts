import { ref } from 'vue'
import { defineStore } from 'pinia'
import { loginWithMockAccount } from '@/services/auth'
import { useBudgetsStore } from '@/stores/budgets'
import { useCategoriesStore } from '@/stores/categories'
import { useGoalsStore } from '@/stores/goals'
import { useTransactionsStore } from '@/stores/transactions'

export const useAuthStore = defineStore('auth', () => {
  const mode = ref<'register' | 'login'>('register')
  const modalOpen = ref(true)
  const currentUser = ref<string | null>(null)
  const loginError = ref('')

  async function login(username: string, password: string): Promise<boolean> {
    const profile = await loginWithMockAccount(username, password)

    if (!profile) {
      loginError.value = 'Invalid credentials. Use Anna/123 or Max/123.'
      return false
    }

    useTransactionsStore().setTransactions(profile.transactions)
    useBudgetsStore().setBudgets(profile.budgets)
    useGoalsStore().setGoals(profile.goals)
    useCategoriesStore().setCategories(profile.categories)

    currentUser.value = profile.username
    loginError.value = ''
    modalOpen.value = false
    return true
  }

  function openLogin(): void {
    mode.value = 'login'
  }

  function openRegister(): void {
    mode.value = 'register'
  }

  function logout(): void {
    currentUser.value = null
    modalOpen.value = true
    mode.value = 'login'
  }

  return { mode, modalOpen, currentUser, loginError, login, openLogin, openRegister, logout }
})
