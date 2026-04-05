// src/pages/Persons/PersonsTable.tsx
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Chip, Tooltip
} from '@mui/material'
import EditIcon   from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import type { Person } from '../../types'
import { useFilter }        from '../../hooks/useFilter'
import { useSort }          from '../../hooks/useSort'
import SearchBar            from '../../components/shared/SearchBar'
import SortableTableCell    from '../../components/shared/SortableTableCell'

interface Props {
  persons:  Person[]
  onEdit:   (person: Person) => void
  onDelete: (person: Person) => void
}

export default function PersonsTable({ persons, onEdit, onDelete }: Props) {
  const { filtered, search, setSearch } = useFilter(persons)
  const { sorted, sort, handleSort }    = useSort(filtered)

  if (persons.length === 0) {
    return <p className="text-center text-gray-500 mt-10">Nenhuma pessoa cadastrada ainda.</p>
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar por nome..."
        />
        <span className="text-sm text-gray-500">
          {filtered.length} de {persons.length} pessoa(s)
        </span>
      </div>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <SortableTableCell field="name" label="Nome"      sort={sort} onSort={handleSort} />
              <SortableTableCell field="age"  label="Idade"     sort={sort} onSort={handleSort} />
              <TableCell sx={{ fontWeight: 'bold' }}>Maioridade</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.length === 0
              ? <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ color: 'text.secondary' }}>
                    Nenhum resultado encontrado.
                  </TableCell>
                </TableRow>
              : sorted.map((person) => (
                  <TableRow key={person.id} hover>
                    <TableCell>{person.name}</TableCell>
                    <TableCell>{person.age} anos</TableCell>
                    <TableCell>
                      <Chip
                        label={person.age >= 18 ? 'Maior de idade' : 'Menor de idade'}
                        color={person.age >= 18 ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Editar">
                        <IconButton size="small" color="primary" onClick={() => onEdit(person)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Deletar">
                        <IconButton size="small" color="error" onClick={() => onDelete(person)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}