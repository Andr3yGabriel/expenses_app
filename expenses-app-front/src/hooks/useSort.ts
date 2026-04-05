import { useState, useMemo } from 'react'

export type SortDirection = 'asc' | 'desc' | null

export interface SortState<T> {
  field:     keyof T | null
  direction: SortDirection
}

export function useSort<T>(data: T[]) {
  const [sort, setSort] = useState<SortState<T>>({ field: null, direction: null })

  const handleSort = (field: keyof T) => {
    setSort((prev) => {
      if (prev.field !== field)              return { field, direction: 'asc'  }
      if (prev.direction === 'asc')          return { field, direction: 'desc' }
      if (prev.direction === 'desc')         return { field: null, direction: null }
      return { field, direction: 'asc' }
    })
  }

  const sorted = useMemo(() => {
    // Sem campo selecionado: retorna a ordem original da API
    if (!sort.field || !sort.direction) return data

    return [...data].sort((a, b) => {
      const aVal = a[sort.field!]
      const bVal = b[sort.field!]

      if (aVal === null || aVal === undefined) return 1
      if (bVal === null || bVal === undefined) return -1

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sort.direction === 'asc'
          ? aVal.localeCompare(bVal, 'pt-BR')
          : bVal.localeCompare(aVal, 'pt-BR')
      }

      if (aVal < bVal) return sort.direction === 'asc' ? -1 : 1
      if (aVal > bVal) return sort.direction === 'asc' ?  1 : -1
      return 0
    })
  }, [data, sort])

  return { sorted, sort, handleSort }
}