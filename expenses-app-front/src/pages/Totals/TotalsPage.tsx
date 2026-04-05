import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert, CircularProgress, Tab, Tabs, Box } from '@mui/material'
import { personsApi } from '../../api/person'
import { categoriesApi } from '../../api/categories'
import PageHeader from '../../components/shared/PageHeader'
import PersonTotalsTable from './PersonTotalsTable'
import CategoryTotalsTable from './CategoryTotalsTable'

export default function TotalsPage() {
  const [tab, setTab] = useState(0)

  const { data: personTotals, isLoading: isLoadingPersons, isError: errorPersons } = useQuery({
    queryKey: ['persons', 'totals'],
    queryFn:  personsApi.getTotals,
  })

  const { data: categoryTotals, isLoading: isLoadingCategories, isError: errorCategories } = useQuery({
    queryKey: ['categories', 'totals'],
    queryFn:  categoriesApi.getTotals,
  })

  const isLoading = isLoadingPersons || isLoadingCategories
  const isError = errorPersons || errorCategories

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Totais por Pessoa" />

      {isError && (
        <Alert severity="error">
          Erro ao carregar totais. Tente novamente.
        </Alert>
      )}
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Por Pessoa" />
          <Tab label="Por Categoria" />
        </Tabs>
      </Box>

      {isLoading
        ? <div className="flex justify-center mt-10">
            <CircularProgress />
          </div>
        : <>
          {tab === 0 && personTotals && 
            <PersonTotalsTable totals={personTotals} />
          }
          {
            tab === 1 && categoryTotals &&
            <CategoryTotalsTable totals={categoryTotals} />
          }
        </>
      }
    </div>
  )
}