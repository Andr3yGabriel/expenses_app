import type { Transaction, TransactionRequest } from '../types'

const BASE = 'http://localhost:8080/api/transactions'

export const transactionsApi = {
  getAll: async (): Promise<Transaction[]> => {
    const res = await fetch(BASE)
    if (!res.ok) throw new Error('Erro ao buscar transações')
    return res.json()
  },

  create: async (data: TransactionRequest): Promise<Transaction> => {
    const res = await fetch(BASE, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    })

    // Extrai a mensagem de erro do back-end (regras de negócio retornam 422)
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message ?? 'Erro ao criar transação')
    }

    return res.json()
  },
}