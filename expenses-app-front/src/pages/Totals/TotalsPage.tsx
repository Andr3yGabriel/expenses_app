import { useQuery } from '@tanstack/react-query'
import { Alert, CircularProgress } from '@mui/material'
import { personsApi } from '../../api/person'
import PageHeader from '../../components/shared/PageHeader'
import TotalsTable from './TotalsTable'

export default function TotalsPage() {
  const { data: totals, isLoading, isError } = useQuery({
    queryKey: ['persons', 'totals'],
    queryFn:  personsApi.getTotals,
  })

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Totais por Pessoa" />

      {isError && (
        <Alert severity="error">
          Erro ao carregar totais. Tente novamente.
        </Alert>
      )}

      {isLoading
        ? <div className="flex justify-center mt-10">
            <CircularProgress />
          </div>
        : totals && <TotalsTable totals={totals} />
      }
    </div>
  )
}