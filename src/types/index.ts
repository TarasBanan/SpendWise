export interface Transaction {
  id: string
  title: string
  amount: number
  categoryId: string
  date: string
  type: 'income' | 'expense'
}

export interface Category {
  id: string
  name: string
  icon: string
  colorToken: string
}

export interface Budget {
  id: string
  categoryId: string
  limit: number
  spent: number
}

export interface Goal {
  id: string
  title: string
  target: number
  current: number
  dueDate: string
}

export interface SettingsState {
  currency: 'RUB' | 'USD' | 'EUR'
  theme: 'light' | 'dark'
}

export interface UserProfile {
  username: string
  transactions: Transaction[]
  budgets: Budget[]
  goals: Goal[]
  categories: Category[]
}
