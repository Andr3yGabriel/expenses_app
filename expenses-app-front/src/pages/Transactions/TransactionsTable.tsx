import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip
} from '@mui/material'
import { TransactionType } from '../../types'
import type { Transaction } from '../../types'

interface Props {
  transactions: Transaction[]
}

export default function TransactionsTable({ transactions }: Props) {
  if (transactions.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Nenhuma transação cadastrada ainda.
      </p>
    )
  }

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead>
          <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
            <TableCell>Descrição</TableCell>
            <TableCell>Pessoa</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell align="right">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.transactionId} hover>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.personName}</TableCell>
              <TableCell>{transaction.categoryName}</TableCell>
              <TableCell>
                <Chip
                  label={transaction.transactionType === TransactionType.Receita ? 'Receita' : 'Despesa'}
                  color={transaction.transactionType === TransactionType.Receita ? 'success' : 'error'}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                {/* Formata o valor como moeda brasileira */}
                <span className={
                  transaction.transactionType === TransactionType.Receita
                    ? 'text-green-600 font-medium'
                    : 'text-red-600 font-medium'
                }>
                  {transaction.amount.toLocaleString('pt-BR', {
                    style:    'currency',
                    currency: 'BRL',
                  })}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}