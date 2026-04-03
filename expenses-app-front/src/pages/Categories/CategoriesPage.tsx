import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Alert, CircularProgress } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { categoriesApi } from '../../api/categories'
import PageHeader from '../../components/shared/PageHeader'
import CategoriesTable from './CategoriesTable'
import CategoryForm from './CategoryForm'

export default function CategoriesPage() {
  const queryClient = useQueryClient()
  const [formOpen, setFormOpen] = useState(false)

  const { data: categories = [], isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn:  categoriesApi.getAll,
  })

  const createMutation = useMutation({
    mutationFn: categoriesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      setFormOpen(false)
    },
  })

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Categorias">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setFormOpen(true)}
        >
          Nova Categoria
        </Button>
      </PageHeader>

      {isError && (
        <Alert severity="error">
          Erro ao carregar categorias. Tente novamente.
        </Alert>
      )}

      {isLoading
        ? <div className="flex justify-center mt-10">
            <CircularProgress />
          </div>
        : <CategoriesTable categories={categories} />
      }

      <CategoryForm
        open={formOpen}
        isLoading={createMutation.isPending}
        error={createMutation.error?.message}
        onClose={() => setFormOpen(false)}
        onSubmit={(data) => createMutation.mutate(data)}
      />
    </div>
  )
}