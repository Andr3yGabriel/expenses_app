import type { Person, PersonRequest, PersonTotals } from '../types'

const BASE = 'http://localhost:8080/api/persons'

export const personsApi = {
  getAll: async (): Promise<Person[]> => {
    const res = await fetch(BASE)
    if (!res.ok) throw new Error('Erro ao buscar pessoas')
    return res.json()
  },

  getById: async (id: string): Promise<Person> => {
    const res = await fetch(`${BASE}/${id}`)
    if (!res.ok) throw new Error('Pessoa não encontrada')
    return res.json()
  },

  getTotals: async (): Promise<PersonTotals> => {
    const res = await fetch(`${BASE}/totals`)
    if (!res.ok) throw new Error('Erro ao buscar totais')
    return res.json()
  },

  create: async (data: PersonRequest): Promise<Person> => {
    const res = await fetch(BASE, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Erro ao criar pessoa')
    return res.json()
  },

  update: async (id: string, data: PersonRequest): Promise<Person> => {
    const res = await fetch(`${BASE}/${id}`, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Erro ao atualizar pessoa')
    return res.json()
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Erro ao deletar pessoa')
  },
}