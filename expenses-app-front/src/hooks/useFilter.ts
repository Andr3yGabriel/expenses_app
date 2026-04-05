import { useState, useMemo } from 'react'

export type FieldSerializer<T> = Partial<Record<keyof T, (val: unknown) => string>>

export function useFilter<T extends object>(data: T[], serializers?: FieldSerializer<T>) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return data

    return data.filter((item) =>
      (Object.entries(item) as [keyof T, unknown][]).some(([key, val]) => {
        // Se houver um serializer para este campo, usa ele para converter o valor
        if (serializers?.[key]) {
          return serializers[key]!(val).toLowerCase().includes(term)
        }
        // Campos string: busca direta
        if (typeof val === 'string') return val.toLowerCase().includes(term)
        // Campos numéricos: converte para string e compara
        if (typeof val === 'number') return String(val).includes(term)
        return false
      })
    )
  }, [data, search, serializers])

  return { filtered, search, setSearch }
}