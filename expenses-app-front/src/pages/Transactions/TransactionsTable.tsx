import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip
} from '@mui/material'
import { TransactionType }   from '../../types'
import type { Transaction }  from '../../types'
import { useFilter, type FieldSerializer }         from '../../hooks/useFilter'
import { useSort }           from '../../hooks/useSort'
import SearchBar             from '../../components/shared/SearchBar'
import SortableTableCell     from '../../components/shared/SortableTableCell'

interface Props {
  transactions: Transaction[]
}

const transactionSerializers: FieldSerializer<Transaction> = {
  transactionType: (val) => val === TransactionType.Receita ? 'Receita' : 'Despesa',
}


const formatBRL = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function TransactionsTable({ transactions }: Props) {
  const { filtered, search, setSearch } = useFilter(transactions, transactionSerializers)
  const { sorted, sort, handleSort }    = useSort(filtered)

  if (transactions.length === 0) {
    return <p className="text-center text-gray-500 mt-10">Nenhuma transação cadastrada ainda.</p>
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar por descrição, pessoa ou categoria..."
        />
        <span className="text-sm text-gray-500">
          {filtered.length} de {transactions.length} transação(ões)
        </span>
      </div>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <SortableTableCell field="description"     label="Descrição"  sort={sort} onSort={handleSort} />
              <SortableTableCell field="personName"      label="Pessoa"     sort={sort} onSort={handleSort} />
              <SortableTableCell field="transactionType" label="Tipo"       sort={sort} onSort={handleSort} />
              <SortableTableCell field="amount"          label="Valor"      sort={sort} onSort={handleSort} align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.length === 0
              ? <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ color: 'text.secondary' }}>
                    Nenhum resultado encontrado.
                  </TableCell>
                </TableRow>
              : sorted.map((transaction) => (
                  <TableRow key={transaction.transactionId} hover>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.personName}</TableCell>
                    <TableCell>
                      <Chip
                        label={transaction.transactionType === TransactionType.Receita ? 'Receita' : 'Despesa'}
                        color={transaction.transactionType === TransactionType.Receita ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <span className={
                        transaction.transactionType === TransactionType.Receita
                          ? 'text-green-600 font-medium'
                          : 'text-red-600 font-medium'
                      }>
                        {formatBRL(transaction.amount)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}