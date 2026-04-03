import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Alert, CircularProgress
} from '@mui/material'
import type { Person, PersonRequest } from '../../types'

interface Props {
  open:      boolean
  person:    Person | null   // null = modo criação, Person = modo edição
  isLoading: boolean
  error?:    string
  onClose:   () => void
  onSubmit:  (data: PersonRequest) => void
}

export default function PersonForm({
  open, person, isLoading, error, onClose, onSubmit
}: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PersonRequest>()

  // Preenche o formulário com os dados da pessoa ao abrir em modo edição,
  // ou limpa os campos ao abrir em modo criação
  useEffect(() => {
    if (open) {
      reset(person ? { name: person.name, age: person.age } : { name: '', age: 0 })
    }
  }, [open, person, reset])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {person ? 'Editar Pessoa' : 'Nova Pessoa'}
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="flex flex-col gap-4">
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Nome"
            fullWidth
            autoFocus
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name', {
              required:  'Nome é obrigatório',
              maxLength: { value: 200, message: 'Máximo de 200 caracteres' },
            })}
          />

          <TextField
            label="Idade"
            type="number"
            fullWidth
            error={!!errors.age}
            helperText={errors.age?.message}
            {...register('age', {
              required: 'Idade é obrigatória',
              valueAsNumber: true,
              min: { value: 0,   message: 'Idade mínima é 0'   },
              max: { value: 150, message: 'Idade máxima é 150' },
            })}
          />
        </DialogContent>

        <DialogActions className="p-4">
          <Button onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading
              ? <CircularProgress size={20} />
              : person ? 'Salvar' : 'Criar'
            }
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}