import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/pages/Dashboard.vue'
import Transactions from '@/pages/Transactions.vue'
import Analytics from '@/pages/Analytics.vue'
import Budgets from '@/pages/Budgets.vue'
import Goals from '@/pages/Goals.vue'
import Categories from '@/pages/Categories.vue'
import Settings from '@/pages/Settings.vue'

export const routes = [
  { path: '/', name: 'dashboard', component: Dashboard },
  { path: '/transactions', name: 'transactions', component: Transactions },
  { path: '/analytics', name: 'analytics', component: Analytics },
  { path: '/budgets', name: 'budgets', component: Budgets },
  { path: '/goals', name: 'goals', component: Goals },
  { path: '/categories', name: 'categories', component: Categories },
  { path: '/settings', name: 'settings', component: Settings }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
