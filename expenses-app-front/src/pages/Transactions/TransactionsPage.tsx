import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Alert, CircularProgress } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { transactionsApi } from '../../api/transactions'
import { personsApi } from '../../api/person'
import { categoriesApi } from '../../api/categories'
import PageHeader from '../../components/shared/PageHeader'
import TransactionsTable from './TransactionsTable'
import TransactionForm from './TransactionForm'

export default function TransactionsPage() {
  const queryClient = useQueryClient()
  const [formOpen, setFormOpen] = useState(false)

  const { data: transactions = [], isLoading, isError } = useQuery({
    queryKey: ['transactions'],
    queryFn:  transactionsApi.getAll,
  })

  // Busca pessoas e categorias em paralelo para popular os selects do formulário
  const { data: persons = [] } = useQuery({
    queryKey: ['persons'],
    queryFn:  personsApi.getAll,
  })

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn:  categoriesApi.getAll,
  })

  const createMutation = useMutation({
    mutationFn: transactionsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      setFormOpen(false)
    },
  })

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Transações">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setFormOpen(true)}
        >
          Nova Transação
        </Button>
      </PageHeader>

      {isError && (
        <Alert severity="error">
          Erro ao carregar transações. Tente novamente.
        </Alert>
      )}

      {isLoading
        ? <div className="flex justify-center mt-10">
            <CircularProgress />
          </div>
        : <TransactionsTable transactions={transactions} />
      }

      <TransactionForm
        open={formOpen}
        persons={persons}
        categories={categories}
        isLoading={createMutation.isPending}
        error={createMutation.error?.message}
        onClose={() => {
          setFormOpen(false)
          createMutation.reset() // limpa o erro ao fechar o modal
        }}
        onSubmit={(data) => createMutation.mutate(data)}
      />
    </div>
  )
}