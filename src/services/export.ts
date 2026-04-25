import type { Transaction } from '@/types'

export async function exportTransactionsCsv(transactions: Transaction[]): Promise<string> {
  const header = 'id,title,amount,categoryId,date,type'
  const rows = transactions.map((item) => [item.id, item.title, item.amount.toString(), item.categoryId, item.date, item.type].join(','))
  return Promise.resolve([header, ...rows].join('\n'))
}
