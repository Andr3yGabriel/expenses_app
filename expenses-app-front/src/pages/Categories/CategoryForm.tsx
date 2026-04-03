import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Alert, CircularProgress,
  FormControl, InputLabel, Select, MenuItem, FormHelperText
} from '@mui/material'
import { Finalidade } from '../../types'
import type { CategoryRequest } from '../../types'

interface Props {
  open:      boolean
  isLoading: boolean
  error?:    string
  onClose:   () => void
  onSubmit:  (data: CategoryRequest) => void
}

// Opções do select de finalidade derivadas do objeto Finalidade
const finalidadeOptions = [
  { value: Finalidade.Despesa, label: 'Despesa' },
  { value: Finalidade.Receita, label: 'Receita' },
  { value: Finalidade.Ambos,   label: 'Ambos'   },
]

export default function CategoryForm({
  open, isLoading, error, onClose, onSubmit
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<CategoryRequest>()

  // Limpa o formulário sempre que o modal for aberto
  useEffect(() => {
    if (open) reset({ description: '', finalidade: undefined })
  }, [open, reset])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Nova Categoria</DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="flex flex-col gap-4">
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Descrição"
            fullWidth
            autoFocus
            error={!!errors.description}
            helperText={errors.description?.message}
            {...register('description', {
              required:  'Descrição é obrigatória',
              maxLength: { value: 400, message: 'Máximo de 400 caracteres' },
            })}
          />

          {/* Controller é necessário para integrar componentes controlados do MUI com o react-hook-form */}
          <Controller
            name="finalidade"
            control={control}
            rules={{ required: 'Finalidade é obrigatória' }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.finalidade}>
                <InputLabel>Finalidade</InputLabel>
                <Select {...field} label="Finalidade" value={field.value ?? ''}>
                  {finalidadeOptions.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.finalidade && (
                  <FormHelperText>{errors.finalidade.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        </DialogContent>

        <DialogActions className="p-4">
          <Button onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? <CircularProgress size={20} /> : 'Criar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}