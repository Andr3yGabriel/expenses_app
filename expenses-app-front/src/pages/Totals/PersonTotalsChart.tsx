// src/pages/Totals/PersonTotalsChart.tsx
import { useMemo } from 'react'
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Typography, Box, useTheme } from '@mui/material'
import type { PersonTotals } from '../../types'

interface Props {
  totals: PersonTotals
}

const formatBRL = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function PersonTotalsChart({ totals }: Props) {
  const theme = useTheme()

  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    '#a855f7',
    '#f97316',
  ]

  const incomeData = useMemo(() =>
    totals.persons
      .filter((p) => p.income > 0)
      .map((p, index) => ({
        name:  p.name,
        value: p.income,
        fill:  COLORS[index % COLORS.length],
      })),
    [totals]
  )

  const expenseData = useMemo(() =>
    totals.persons
      .filter((p) => p.expense > 0)
      .map((p, index) => ({
        name:  p.name,
        value: p.expense,
        fill:  COLORS[index % COLORS.length],
      })),
    [totals]
  )

  if (incomeData.length === 0 && expenseData.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Nenhuma movimentação para exibir no gráfico.
      </p>
    )
  }

  const tooltipStyle = {
    backgroundColor: theme.palette.background.paper,
    borderColor:     theme.palette.divider,
    borderRadius:    8,
  }

  return (
    <Box className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {incomeData.length > 0 && (
          <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 3, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1" fontWeight="bold" color="success.main" gutterBottom>
              Receitas por Pessoa
            </Typography>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={incomeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                />
                <Tooltip
                  formatter={(value) => {
                    if (typeof value !== 'number') return ''
                    return formatBRL(value)
                  }}
                  contentStyle={tooltipStyle}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        )}

        {expenseData.length > 0 && (
          <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 3, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1" fontWeight="bold" color="error.main" gutterBottom>
              Despesas por Pessoa
            </Typography>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                />
                <Tooltip
                  formatter={(value) => {
                    if (typeof value !== 'number') return ''
                    return formatBRL(value)
                  }}
                  contentStyle={tooltipStyle}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        )}
      </div>
    </Box>
  )
}