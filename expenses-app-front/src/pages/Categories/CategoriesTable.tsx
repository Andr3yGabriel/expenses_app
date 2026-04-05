import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip
} from '@mui/material'
import { Finalidade }     from '../../types'
import type { Category }  from '../../types'
import { useFilter, type FieldSerializer }      from '../../hooks/useFilter'
import { useSort }        from '../../hooks/useSort'
import SearchBar          from '../../components/shared/SearchBar'
import SortableTableCell  from '../../components/shared/SortableTableCell'

interface Props {
  categories: Category[]
}

const finalidadeConfig: Record<Finalidade, { label: string; color: 'error' | 'success' | 'info' }> = {
  [Finalidade.Despesa]: { label: 'Despesa', color: 'error'   },
  [Finalidade.Receita]: { label: 'Receita', color: 'success' },
  [Finalidade.Ambos]:   { label: 'Ambos',   color: 'info'    },
}

const categorySerializers: FieldSerializer<Category> = {
  finalidade: (val) => {
    const map: Record<number, string> = {
      [Finalidade.Despesa]: 'Despesa',
      [Finalidade.Receita]: 'Receita',
      [Finalidade.Ambos]:   'Ambos',
    }
    return map[val as number] ?? ''
  },
}

export default function CategoriesTable({ categories }: Props) {
  const { filtered, search, setSearch } = useFilter(categories, categorySerializers)
  const { sorted, sort, handleSort }    = useSort(filtered)

  if (categories.length === 0) {
    return <p className="text-center text-gray-500 mt-10">Nenhuma categoria cadastrada ainda.</p>
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar por descrição..."
        />
        <span className="text-sm text-gray-500">
          {filtered.length} de {categories.length} categoria(s)
        </span>
      </div>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <SortableTableCell field="description" label="Descrição"  sort={sort} onSort={handleSort} />
              <SortableTableCell field="finalidade"  label="Finalidade" sort={sort} onSort={handleSort} />
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.length === 0
              ? <TableRow>
                  <TableCell colSpan={2} align="center" sx={{ color: 'text.secondary' }}>
                    Nenhum resultado encontrado.
                  </TableCell>
                </TableRow>
              : sorted.map((category) => {
                  const config = finalidadeConfig[category.finalidade]
                  return (
                    <TableRow key={category.categoryId} hover>
                      <TableCell>{category.description}</TableCell>
                      <TableCell>
                        <Chip label={config.label} color={config.color} size="small" />
                      </TableCell>
                    </TableRow>
                  )
                })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}