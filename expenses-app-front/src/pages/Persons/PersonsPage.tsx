import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Alert, CircularProgress } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { personsApi } from '../../api/person'
import type { Person } from '../../types'
import PersonsTable from './PersonsTable'
import PersonForm from './PersonForm'
import ConfirmDialog from '../../components/shared/ConfirmDialog'
import PageHeader from '../../components/shared/PageHeader'

export default function PersonsPage() {
  const queryClient = useQueryClient()

  // Controle de estado dos modais
  const [formOpen, setFormOpen]       = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selected, setSelected]       = useState<Person | null>(null)

  // Busca todas as pessoas — o TanStack Query faz cache automático
  const { data: persons = [], isLoading, isError } = useQuery({
    queryKey: ['persons'],
    queryFn:  personsApi.getAll,
  })

  // Cria ou edita dependendo se há uma pessoa selecionada
  const saveMutation = useMutation({
    mutationFn: (data: { name: string; age: number }) =>
      selected
        ? personsApi.update(selected.id, data)
        : personsApi.create(data),
    onSuccess: () => {
      // Invalida o cache para forçar um novo fetch da listagem
      queryClient.invalidateQueries({ queryKey: ['persons'] })
      handleCloseForm()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => personsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['persons'] })
      setConfirmOpen(false)
      setSelected(null)
    },
  })

  const handleOpenCreate = () => {
    setSelected(null)  // garante que não há pessoa selecionada (modo criação)
    setFormOpen(true)
  }

  const handleOpenEdit = (person: Person) => {
    setSelected(person)
    setFormOpen(true)
  }

  const handleOpenDelete = (person: Person) => {
    setSelected(person)
    setConfirmOpen(true)
  }

  const handleCloseForm = () => {
    setFormOpen(false)
    setSelected(null)
  }

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Pessoas">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
        >
          Nova Pessoa
        </Button>
      </PageHeader>

      {isError && (
        <Alert severity="error">
          Erro ao carregar pessoas. Tente novamente.
        </Alert>
      )}

      {isLoading
        ? <div className="flex justify-center mt-10">
            <CircularProgress />
          </div>
        : <PersonsTable
            persons={persons}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
          />
      }

      {/* Modal de criação/edição */}
      <PersonForm
        open={formOpen}
        person={selected}
        isLoading={saveMutation.isPending}
        error={saveMutation.error?.message}
        onClose={handleCloseForm}
        onSubmit={(data) => saveMutation.mutate(data)}
      />

      {/* Dialog de confirmação de deleção */}
      <ConfirmDialog
        open={confirmOpen}
        title="Deletar Pessoa"
        description={
          `Tem certeza que deseja deletar "${selected?.name}"? ` +
          `Todas as transações desta pessoa também serão removidas.`
        }
        isLoading={deleteMutation.isPending}
        onConfirm={() => selected && deleteMutation.mutate(selected.id)}
        onCancel={() => {
          setConfirmOpen(false)
          setSelected(null)
        }}
      />
    </div>
  )
}