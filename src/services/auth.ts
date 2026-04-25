import type { UserProfile } from '@/types'

const userProfiles: Record<string, UserProfile> = {
  Anna: {
    username: 'Anna',
    transactions: [
      { id: 'anna-tx-1', title: 'Salary', amount: 240000, categoryId: 'salary', date: '2026-04-05', type: 'income', description: 'Monthly payroll', tag: 'Salary' },
      { id: 'anna-tx-2', title: 'Cafe', amount: 6200, categoryId: 'food', date: '2026-04-08', type: 'expense', description: 'Lunch and coffee', tag: 'Groceries' },
      { id: 'anna-tx-3', title: 'UX Course', amount: 18000, categoryId: 'education', date: '2026-04-12', type: 'expense', description: 'Design learning', tag: 'Education' },
      { id: 'anna-tx-4', title: 'Freelance Design', amount: 53000, categoryId: 'freelance', date: '2026-03-18', type: 'income', description: 'Brand identity project', tag: 'Freelance' },
      { id: 'anna-tx-5', title: 'Grocery Hypermarket', amount: 11400, categoryId: 'food', date: '2026-03-16', type: 'expense', description: 'Weekly shopping', tag: 'Groceries' },
      { id: 'anna-tx-6', title: 'Taxi', amount: 3700, categoryId: 'transport', date: '2026-03-10', type: 'expense', description: 'Airport commute', tag: 'Transport' },
      { id: 'anna-tx-7', title: 'Bonus', amount: 45000, categoryId: 'salary', date: '2026-02-28', type: 'income', description: 'Quarter bonus', tag: 'Bonus' },
      { id: 'anna-tx-8', title: 'Medicine', amount: 2900, categoryId: 'health', date: '2026-02-21', type: 'expense', description: 'Pharmacy', tag: 'Medicines' },
      { id: 'anna-tx-9', title: 'Debt Repaid', amount: 12000, categoryId: 'debt', date: '2026-02-12', type: 'income', description: 'Friend repaid borrowed money', tag: 'Debt repaid' },
      { id: 'anna-tx-10', title: 'Fuel', amount: 5100, categoryId: 'transport', date: '2026-02-05', type: 'expense', description: 'Gas refill', tag: 'Fuel' },
      { id: 'anna-tx-11', title: 'Salary', amount: 240000, categoryId: 'salary', date: '2026-01-05', type: 'income', description: 'Monthly payroll', tag: 'Salary' },
      { id: 'anna-tx-12', title: 'Restaurant', amount: 7600, categoryId: 'food', date: '2026-01-13', type: 'expense', description: 'Dinner with friends', tag: 'Groceries' },
      { id: 'anna-tx-13', title: 'Utilities', amount: 8400, categoryId: 'housing', date: '2025-12-25', type: 'expense', description: 'Electricity and internet', tag: 'Utilities' },
      { id: 'anna-tx-14', title: 'Gift', amount: 15000, categoryId: 'gift', date: '2025-12-29', type: 'income', description: 'Holiday gift from family', tag: 'Gift' },
      { id: 'anna-tx-15', title: 'Train Tickets', amount: 6800, categoryId: 'transport', date: '2025-11-20', type: 'expense', description: 'Weekend trip', tag: 'Transport' },
      { id: 'anna-tx-16', title: 'Salary', amount: 236000, categoryId: 'salary', date: '2025-11-05', type: 'income', description: 'Monthly payroll', tag: 'Salary' },
      { id: 'anna-tx-17', title: 'Laptop Repair', amount: 14500, categoryId: 'tech', date: '2025-10-14', type: 'expense', description: 'Battery replacement', tag: 'Utilities' },
      { id: 'anna-tx-18', title: 'Freelance UI Audit', amount: 34000, categoryId: 'freelance', date: '2025-10-02', type: 'income', description: 'UX consulting', tag: 'Freelance' },
      { id: 'anna-tx-19', title: 'Yoga Membership', amount: 4200, categoryId: 'health', date: '2025-09-19', type: 'expense', description: 'Monthly pass', tag: 'Medicines' },
      { id: 'anna-tx-20', title: 'Salary', amount: 230000, categoryId: 'salary', date: '2025-09-05', type: 'income', description: 'Monthly payroll', tag: 'Salary' },
      { id: 'anna-tx-21', title: 'Charity', amount: 6000, categoryId: 'other', date: '2025-08-23', type: 'expense', description: 'Donation', tag: 'Utilities' },
      { id: 'anna-tx-22', title: 'Bonus', amount: 28000, categoryId: 'salary', date: '2025-08-03', type: 'income', description: 'Team performance reward', tag: 'Bonus' }
    ],
    budgets: [
      { id: 'anna-budget-food', categoryId: 'food', limit: 35000, spent: 17600 },
      { id: 'anna-budget-education', categoryId: 'education', limit: 25000, spent: 18000 }
    ],
    goals: [
      { id: 'anna-goal-1', title: 'Travel Fund', target: 300000, current: 132000, dueDate: '2026-11-30' },
      { id: 'anna-goal-2', title: 'Emergency Savings', target: 500000, current: 210000, dueDate: '2026-12-31' }
    ],
    categories: [
      { id: 'salary', name: 'Salary', icon: '💼', colorToken: 'var(--color-ink)' },
      { id: 'food', name: 'Food', icon: '🛒', colorToken: 'var(--color-muted)' },
      { id: 'education', name: 'Education', icon: '📚', colorToken: 'var(--color-muted)' },
      { id: 'transport', name: 'Transport', icon: '🚕', colorToken: 'var(--color-muted)' },
      { id: 'health', name: 'Health', icon: '💊', colorToken: 'var(--color-muted)' }
    ]
  },
  Max: {
    username: 'Max',
    transactions: [
      { id: 'max-tx-1', title: 'Freelance', amount: 145000, categoryId: 'salary', date: '2026-04-03', type: 'income', description: 'Client project', tag: 'Freelance' },
      { id: 'max-tx-2', title: 'Rent', amount: 42000, categoryId: 'housing', date: '2026-04-04', type: 'expense', description: 'Apartment rent', tag: 'Housing' },
      { id: 'max-tx-3', title: 'Gym', amount: 4500, categoryId: 'health', date: '2026-04-09', type: 'expense', description: 'Monthly membership', tag: 'Health' },
      { id: 'max-tx-4', title: 'Contract Payment', amount: 98000, categoryId: 'freelance', date: '2026-03-19', type: 'income', description: 'Mobile app milestone', tag: 'Freelance' },
      { id: 'max-tx-5', title: 'Fuel', amount: 7400, categoryId: 'transport', date: '2026-03-15', type: 'expense', description: 'Car fuel', tag: 'Fuel' },
      { id: 'max-tx-6', title: 'Groceries', amount: 12300, categoryId: 'food', date: '2026-03-10', type: 'expense', description: 'Monthly groceries', tag: 'Groceries' },
      { id: 'max-tx-7', title: 'Debt Repaid', amount: 19000, categoryId: 'debt', date: '2026-02-24', type: 'income', description: 'Colleague paid back', tag: 'Debt repaid' },
      { id: 'max-tx-8', title: 'Medicine', amount: 3200, categoryId: 'health', date: '2026-02-17', type: 'expense', description: 'Pharmacy', tag: 'Medicines' },
      { id: 'max-tx-9', title: 'Bonus', amount: 41000, categoryId: 'salary', date: '2026-02-09', type: 'income', description: 'Performance bonus', tag: 'Bonus' },
      { id: 'max-tx-10', title: 'Utilities', amount: 9200, categoryId: 'housing', date: '2026-02-02', type: 'expense', description: 'Home utilities', tag: 'Utilities' },
      { id: 'max-tx-11', title: 'Freelance', amount: 131000, categoryId: 'freelance', date: '2026-01-28', type: 'income', description: 'Backend API project', tag: 'Freelance' },
      { id: 'max-tx-12', title: 'Restaurant', amount: 6800, categoryId: 'food', date: '2026-01-16', type: 'expense', description: 'Weekend dinner', tag: 'Groceries' },
      { id: 'max-tx-13', title: 'Rent', amount: 42000, categoryId: 'housing', date: '2026-01-04', type: 'expense', description: 'Apartment rent', tag: 'Housing' },
      { id: 'max-tx-14', title: 'Gift', amount: 12000, categoryId: 'gift', date: '2025-12-30', type: 'income', description: 'Birthday gift', tag: 'Gift' },
      { id: 'max-tx-15', title: 'Laptop Accessories', amount: 5600, categoryId: 'tech', date: '2025-12-11', type: 'expense', description: 'Dock and keyboard', tag: 'Utilities' },
      { id: 'max-tx-16', title: 'Freelance', amount: 119000, categoryId: 'freelance', date: '2025-11-21', type: 'income', description: 'Website redesign', tag: 'Freelance' },
      { id: 'max-tx-17', title: 'Transport', amount: 4100, categoryId: 'transport', date: '2025-11-06', type: 'expense', description: 'Taxi and parking', tag: 'Transport' },
      { id: 'max-tx-18', title: 'Groceries', amount: 10100, categoryId: 'food', date: '2025-10-18', type: 'expense', description: 'Store shopping', tag: 'Groceries' },
      { id: 'max-tx-19', title: 'Salary', amount: 168000, categoryId: 'salary', date: '2025-10-01', type: 'income', description: 'Main work salary', tag: 'Salary' },
      { id: 'max-tx-20', title: 'Medicine', amount: 2600, categoryId: 'health', date: '2025-09-19', type: 'expense', description: 'Doctor prescription', tag: 'Medicines' },
      { id: 'max-tx-21', title: 'Bonus', amount: 26000, categoryId: 'salary', date: '2025-09-03', type: 'income', description: 'Quarterly bonus', tag: 'Bonus' },
      { id: 'max-tx-22', title: 'Rent', amount: 40000, categoryId: 'housing', date: '2025-08-05', type: 'expense', description: 'Apartment rent', tag: 'Housing' }
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
      { id: 'health', name: 'Health', icon: '🏋️', colorToken: 'var(--color-muted)' },
      { id: 'food', name: 'Food', icon: '🛒', colorToken: 'var(--color-muted)' },
      { id: 'transport', name: 'Transport', icon: '🚕', colorToken: 'var(--color-muted)' }
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
