import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Alert, CircularProgress,
  FormControl, InputLabel, Select, MenuItem,
  FormHelperText
} from '@mui/material'
import { TransactionType, Finalidade } from '../../types'
import type { TransactionRequest, Person, Category } from '../../types'

interface Props {
  open:       boolean
  persons:    Person[]
  categories: Category[]
  isLoading:  boolean
  error?:     string
  onClose:    () => void
  onSubmit:   (data: TransactionRequest) => void
}

const transactionTypeOptions = [
  { value: TransactionType.Despesa, label: 'Despesa' },
  { value: TransactionType.Receita, label: 'Receita' },
]

export default function TransactionForm({
  open, persons, categories, isLoading, error, onClose, onSubmit
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<TransactionRequest>()

  // Observa os campos para aplicar filtros reativos
  const selectedPersonId      = watch('personId')
  const selectedTransactionType = watch('transactionType')

  // Verifica se a pessoa selecionada é menor de idade
  const selectedPerson = persons.find(p => p.id === selectedPersonId)
  const isMinor        = selectedPerson ? selectedPerson.age < 18 : false

  // Filtra categorias compatíveis com o tipo de transação selecionado:
  // Despesa → categorias Despesa ou Ambos
  // Receita → categorias Receita ou Ambos
  const filteredCategories = categories.filter((cat) => {
    if (selectedTransactionType === TransactionType.Despesa) {
      return cat.finalidade === Finalidade.Despesa || cat.finalidade === Finalidade.Ambos
    }
    if (selectedTransactionType === TransactionType.Receita) {
      return cat.finalidade === Finalidade.Receita || cat.finalidade === Finalidade.Ambos
    }
    return true
  })

  useEffect(() => {
    if (open) {
      reset({
        description:     '',
        amount:          0,
        transactionType: undefined,
        personId:        '',
        categoryId:      '',
      })
    }
  }, [open, reset])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Nova Transação</DialogTitle>

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

          <TextField
            label="Valor"
            type="number"
            fullWidth
            error={!!errors.amount}
            helperText={errors.amount?.message}
            inputProps={{ step: '0.01', min: '0.01' }}
            {...register('amount', {
              required: 'Valor é obrigatório',
              valueAsNumber: true,
              min: { value: 0.01, message: 'O valor deve ser maior que zero' },
            })}
          />

          {/* Pessoa — ao trocar, reseta a categoria pois o filtro muda */}
          <Controller
            name="personId"
            control={control}
            rules={{ required: 'Pessoa é obrigatória' }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.personId}>
                <InputLabel>Pessoa</InputLabel>
                <Select {...field} label="Pessoa" value={field.value ?? ''}>
                  {persons.map((person) => (
                    <MenuItem key={person.id} value={person.id}>
                      {person.name} {person.age < 18 ? '(menor de idade)' : ''}
                    </MenuItem>
                  ))}
                </Select>
                {errors.personId && (
                  <FormHelperText>{errors.personId.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          {/* Tipo da transação — desabilitado para Receita se a pessoa for menor de idade */}
          <Controller
            name="transactionType"
            control={control}
            rules={{ required: 'Tipo é obrigatório' }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.transactionType}>
                <InputLabel>Tipo</InputLabel>
                <Select {...field} label="Tipo" value={field.value ?? ''}>
                  {transactionTypeOptions.map((opt) => (
                    <MenuItem
                      key={opt.value}
                      value={opt.value}
                      // Desabilita Receita para menores de idade diretamente no select,
                      // antecipando a regra de negócio do back-end
                      disabled={isMinor && opt.value === TransactionType.Receita}
                    >
                      {opt.label}
                      {isMinor && opt.value === TransactionType.Receita
                        ? ' (não permitido para menores)'
                        : ''
                      }
                    </MenuItem>
                  ))}
                </Select>
                {errors.transactionType && (
                  <FormHelperText>{errors.transactionType.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          {/* Categoria — filtrada dinamicamente conforme o tipo selecionado */}
          <Controller
            name="categoryId"
            control={control}
            rules={{ required: 'Categoria é obrigatória' }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.categoryId}>
                <InputLabel>Categoria</InputLabel>
                <Select
                  {...field}
                  label="Categoria"
                  value={field.value ?? ''}
                  // Desabilita enquanto o tipo não for selecionado
                  disabled={!selectedTransactionType}
                >
                  {filteredCategories.length === 0
                    ? <MenuItem disabled>Nenhuma categoria disponível</MenuItem>
                    : filteredCategories.map((cat) => (
                        <MenuItem key={cat.categoryId} value={cat.categoryId}>
                          {cat.description}
                        </MenuItem>
                      ))
                  }
                </Select>
                {!selectedTransactionType && (
                  <FormHelperText>Selecione o tipo primeiro</FormHelperText>
                )}
                {errors.categoryId && (
                  <FormHelperText error>{errors.categoryId.message}</FormHelperText>
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