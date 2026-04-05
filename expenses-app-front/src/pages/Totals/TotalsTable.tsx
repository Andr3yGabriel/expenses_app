import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Box
} from '@mui/material'
import type { PersonTotals } from '../../types'

interface Props {
  totals: PersonTotals
}

// Formata um número como moeda brasileira
const formatBRL = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

// Aplica cor verde para saldo positivo, vermelho para negativo e cinza para zero
const balanceColor = (value: number) => {
  if (value > 0) return 'text-green-600'
  if (value < 0) return 'text-red-600'
  return 'text-gray-500'
}

export default function TotalsTable({ totals }: Props) {
  if (totals.persons.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Nenhuma pessoa cadastrada ainda.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
              <TableCell>Pessoa</TableCell>
              <TableCell align="right">Receitas</TableCell>
              <TableCell align="right">Despesas</TableCell>
              <TableCell align="right">Saldo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Linhas individuais por pessoa */}
            {totals.persons.map((person) => (
              <TableRow key={person.personId} hover>
                <TableCell>{person.name}</TableCell>
                <TableCell align="right" className="text-green-600">
                  {formatBRL(person.income)}
                </TableCell>
                <TableCell align="right" className="text-red-600">
                  {formatBRL(person.expense)}
                </TableCell>
                <TableCell align="right">
                  <span className={`font-medium ${balanceColor(person.balance)}`}>
                    {formatBRL(person.balance)}
                  </span>
                </TableCell>
              </TableRow>
            ))}

            {/* Linha separadora do totalizador geral */}
            <TableRow sx={{ '& td': { borderTop: '2px solid', borderColor: 'divider' } }}>
              <TableCell>
                <Typography fontWeight="bold">
                  Total Geral
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight="bold" className="text-green-600">
                  {formatBRL(totals.totalIncome)}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight="bold" className="text-red-600">
                  {formatBRL(totals.totalExpense)}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight="bold" className={balanceColor(totals.netBalance)}>
                  {formatBRL(totals.netBalance)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Cards de resumo abaixo da tabela */}
      <div className="grid grid-cols-3 gap-4">
        <SummaryCard
          label="Total de Receitas"
          value={formatBRL(totals.totalIncome)}
          colorClass="text-green-600"
          bgClass="bg-green-50"
        />
        <SummaryCard
          label="Total de Despesas"
          value={formatBRL(totals.totalExpense)}
          colorClass="text-red-600"
          bgClass="bg-red-50"
        />
        <SummaryCard
          label="Saldo Líquido"
          value={formatBRL(totals.netBalance)}
          colorClass={balanceColor(totals.netBalance)}
          bgClass="bg-gray-50"
        />
      </div>
    </div>
  )
}

// Componente interno — usado apenas nesta página para os cards de resumo
interface SummaryCardProps {
  label:      string
  value:      string
  colorClass: string
  bgClass:    string
}

function SummaryCard({ label, value, colorClass, bgClass: _ }: SummaryCardProps) {
  const sxColor = 
    colorClass === 'text-green-600' ? 'success.main' 
    : colorClass === 'text-red-600'   ? 'error.main' 
    : 'text.primary'

  return (
    <Box
      sx={{
        borderRadius: 2,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h6" fontWeight="bold" color={sxColor}>
        {value}
      </Typography>
    </Box>
  )
}