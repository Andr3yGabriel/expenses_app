import { useState } from 'react'
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Chip, Box, ToggleButton, ToggleButtonGroup
} from '@mui/material'
import TableChartIcon from '@mui/icons-material/TableChart'
import PieChartIcon from '@mui/icons-material/PieChart'
import { Finalidade }        from '../../types'
import type { CategoryTotals } from '../../types'
import CategoryTotalsChart from './CategoryTotalsChart'

interface Props {
  totals: CategoryTotals
}

const formatBRL = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const balanceColor = (value: number) => {
  if (value > 0) return 'success.main'
  if (value < 0) return 'error.main'
  return 'text.secondary'
}

const finalidadeConfig: Record<Finalidade, { label: string; color: 'error' | 'success' | 'info' }> = {
  [Finalidade.Despesa]: { label: 'Despesa', color: 'error'   },
  [Finalidade.Receita]: { label: 'Receita', color: 'success' },
  [Finalidade.Ambos]:   { label: 'Ambos',   color: 'info'    },
}

export default function CategoryTotalsTable({ totals }: Props) {
  const [view, setView] = useState<'table' | 'chart'>('table')

  if (totals.categories.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Nenhuma movimentação registrada ainda.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Toggle tabela / gráfico */}
      <div className="flex justify-end">
        <ToggleButtonGroup
          value={view}
          exclusive
          size="small"
          onChange={(_, val) => val && setView(val)}
        >
          <ToggleButton value="table">
            <TableChartIcon fontSize="small" sx={{ mr: 0.5 }} />
            Tabela
          </ToggleButton>
          <ToggleButton value="chart">
            <PieChartIcon fontSize="small" sx={{ mr: 0.5 }} />
            Gráfico
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      {view === 'chart'
      ? <CategoryTotalsChart totals={totals} />
      : <>
          <TableContainer component={Paper} elevation={2}>
            <Table>
              <TableHead>
                <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                  <TableCell>Categoria</TableCell>
                  <TableCell>Finalidade</TableCell>
                  <TableCell align="right">Receitas</TableCell>
                  <TableCell align="right">Despesas</TableCell>
                  <TableCell align="right">Saldo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {totals.categories.map((cat) => {
                  const config = finalidadeConfig[cat.finalidade]
                  return (
                    <TableRow key={cat.categoryId} hover>
                      <TableCell>{cat.description}</TableCell>
                      <TableCell>
                        <Chip label={config.label} color={config.color} size="small" />
                      </TableCell>
                      <TableCell align="right" sx={{ color: cat.income  > 0 ? 'success.main' : 'text.secondary' }}>
                        {formatBRL(cat.income)}
                      </TableCell>
                      <TableCell align="right" sx={{ color: cat.expense > 0 ? 'error.main' : 'text.secondary' }}>
                        {formatBRL(cat.expense)}
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="body2"
                          fontWeight="medium"
                          color={balanceColor(cat.balance)}
                        >
                          {formatBRL(cat.balance)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                })}

                {/* Linha totalizadora */}
                <TableRow sx={{ '& td': { borderTop: '2px solid', borderColor: 'divider' } }}>
                  <TableCell colSpan={2}>
                    <Typography fontWeight="bold">Total Geral</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontWeight="bold" color="success.main">
                      {formatBRL(totals.totalIncome)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontWeight="bold" color="error.main">
                      {formatBRL(totals.totalExpense)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontWeight="bold" color={balanceColor(totals.netBalance)}>
                      {formatBRL(totals.netBalance)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Cards de resumo */}
          <div className="grid grid-cols-3 gap-4">
            <SummaryCard label="Total de Receitas" value={formatBRL(totals.totalIncome)}  color="success.main" />
            <SummaryCard label="Total de Despesas" value={formatBRL(totals.totalExpense)} color="error.main"   />
            <SummaryCard label="Saldo Líquido"     value={formatBRL(totals.netBalance)}   color={balanceColor(totals.netBalance)} />
          </div>
        </>
      }  
    </div>
  )
}

interface SummaryCardProps {
  label: string
  value: string
  color: string
}

function SummaryCard({ label, value, color }: SummaryCardProps) {
  return (
    <Box sx={{
      borderRadius: 2,
      p:            2,
      display:      'flex',
      flexDirection:'column',
      gap:          0.5,
      bgcolor:      'background.paper',
      border:       '1px solid',
      borderColor:  'divider',
    }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="h6" fontWeight="bold" color={color}>{value}</Typography>
    </Box>
  )
}