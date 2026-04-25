import type { UserProfile } from '@/types'

const userProfiles: Record<string, UserProfile> = {
  Anna: {
    username: 'Anna',
    transactions: [
      { id: 'anna-tx-1', title: 'Salary', amount: 240000, categoryId: 'salary', date: '2026-04-05', type: 'income' },
      { id: 'anna-tx-2', title: 'Cafe', amount: 6200, categoryId: 'food', date: '2026-04-08', type: 'expense' },
      { id: 'anna-tx-3', title: 'UX Course', amount: 18000, categoryId: 'education', date: '2026-04-12', type: 'expense' }
    ],
    budgets: [
      { id: 'anna-budget-food', categoryId: 'food', limit: 35000, spent: 6200 },
      { id: 'anna-budget-education', categoryId: 'education', limit: 25000, spent: 18000 }
    ],
    goals: [
      { id: 'anna-goal-1', title: 'Travel Fund', target: 300000, current: 132000, dueDate: '2026-11-30' },
      { id: 'anna-goal-2', title: 'Emergency Savings', target: 500000, current: 210000, dueDate: '2026-12-31' }
    ],
    categories: [
      { id: 'salary', name: 'Salary', icon: '💼', colorToken: 'var(--color-ink)' },
      { id: 'food', name: 'Food', icon: '🛒', colorToken: 'var(--color-muted)' },
      { id: 'education', name: 'Education', icon: '📚', colorToken: 'var(--color-muted)' }
    ]
  },
  Max: {
    username: 'Max',
    transactions: [
      { id: 'max-tx-1', title: 'Freelance', amount: 145000, categoryId: 'salary', date: '2026-04-03', type: 'income' },
      { id: 'max-tx-2', title: 'Rent', amount: 42000, categoryId: 'housing', date: '2026-04-04', type: 'expense' },
      { id: 'max-tx-3', title: 'Gym', amount: 4500, categoryId: 'health', date: '2026-04-09', type: 'expense' }
    ],
    budgets: [
      { id: 'max-budget-housing', categoryId: 'housing', limit: 50000, spent: 42000 },
      { id: 'max-budget-health', categoryId: 'health', limit: 12000, spent: 4500 }
    ],
    goals: [
      { id: 'max-goal-1', title: 'Home Office Upgrade', target: 180000, current: 70000, dueDate: '2026-09-30' },
      { id: 'max-goal-2', title: 'Motorbike', target: 450000, current: 98000, dueDate: '2027-03-30' }
    ],
    categories: [
      { id: 'salary', name: 'Income', icon: '💼', colorToken: 'var(--color-ink)' },
      { id: 'housing', name: 'Housing', icon: '🏠', colorToken: 'var(--color-muted)' },
      { id: 'health', name: 'Health', icon: '🏋️', colorToken: 'var(--color-muted)' }
    ]
  }
}

export async function loginWithMockAccount(username: string, password: string): Promise<UserProfile | null> {
  if (password !== '123') {
    return Promise.resolve(null)
  }

  const profile = userProfiles[username]
  if (!profile) {
    return Promise.resolve(null)
  }

  return Promise.resolve({
    username: profile.username,
    transactions: [...profile.transactions],
    budgets: [...profile.budgets],
    goals: [...profile.goals],
    categories: [...profile.categories]
  })
}

export async function signOut(): Promise<{ success: true }> {
  return Promise.resolve({ success: true })
}
