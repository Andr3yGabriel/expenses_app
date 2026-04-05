// src/components/shared/SortableTableCell.tsx
import { TableCell, TableSortLabel } from '@mui/material'
import type { SortState } from '../../hooks/useSort'

interface Props<T> {
  field:  keyof T
  label:  string
  sort:   SortState<T>
  onSort: (field: keyof T) => void
  align?: 'left' | 'right' | 'center'
}

export default function SortableTableCell<T>({
  field, label, sort, onSort, align = 'left'
}: Props<T>) {
  const isActive = sort.field === field && sort.direction !== null

  return (
    <TableCell align={align} sx={{ fontWeight: 'bold' }}>
      <TableSortLabel
        active={isActive}
        direction={isActive && sort.direction !== null ? sort.direction : 'asc'}
        onClick={() => onSort(field)}
      >
        {label}
      </TableSortLabel>
    </TableCell>
  )
}