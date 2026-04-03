import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Chip, Tooltip
} from '@mui/material'
import EditIcon   from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import type { Person } from '../../types'

interface Props {
  persons:  Person[]
  onEdit:   (person: Person) => void
  onDelete: (person: Person) => void
}

export default function PersonsTable({ persons, onEdit, onDelete }: Props) {
  if (persons.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Nenhuma pessoa cadastrada ainda.
      </p>
    )
  }

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead>
          <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
            <TableCell>Nome</TableCell>
            <TableCell>Idade</TableCell>
            <TableCell>Maioridade</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {persons.map((person) => (
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
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => onEdit(person)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Deletar">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => onDelete(person)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}