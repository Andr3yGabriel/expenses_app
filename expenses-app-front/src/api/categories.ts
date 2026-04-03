import type { Category, CategoryRequest } from '../types'

const BASE = 'http://localhost:8080/api/categories'

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const res = await fetch(BASE)
    if (!res.ok) throw new Error('Erro ao buscar categorias')
    return res.json()
  },

  create: async (data: CategoryRequest): Promise<Category> => {
    const res = await fetch(BASE, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Erro ao criar categoria')
    return res.json()
  },
}