import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip
} from '@mui/material'
import { Finalidade } from '../../types'
import type { Category } from '../../types'

interface Props {
  categories: Category[]
}

const finalidadeConfig: Record<Finalidade, { label: string; color: 'error' | 'success' | 'info' }> = {
  [Finalidade.Despesa]: { label: 'Despesa', color: 'error'   },
  [Finalidade.Receita]: { label: 'Receita', color: 'success' },
  [Finalidade.Ambos]:   { label: 'Ambos',   color: 'info'    },
}

export default function CategoriesTable({ categories }: Props) {
  if (categories.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Nenhuma categoria cadastrada ainda.
      </p>
    )
  }

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead>
          <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
            <TableCell>Descrição</TableCell>
            <TableCell>Finalidade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => {
            const config = finalidadeConfig[category.finalidade]
            return (
              <TableRow key={category.categoryId} hover>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <Chip
                    label={config.label}
                    color={config.color}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}