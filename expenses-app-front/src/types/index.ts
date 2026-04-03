export const Finalidade = {
  Despesa: 1,
  Receita: 2,
  Ambos:   3,
} as const
export type Finalidade = typeof Finalidade[keyof typeof Finalidade]

export const TransactionType = {
  Despesa: 1,
  Receita: 2,
} as const
export type TransactionType = typeof TransactionType[keyof typeof TransactionType]

// Response DTOs
export interface Person {
  id:   string;
  name: string;
  age:  number;
}

export interface Category {
  categoryId:  string;
  description: string;
  finalidade:  Finalidade;
}

export interface Transaction {
  transactionId:   string;
  description:     string;
  amount:          number;
  transactionType: TransactionType;
  personId:        string;
  personName:      string;
  categoryId:      string;
  categoryName:    string;
}

export interface PersonSummary {
  personId: string;
  name:     string;
  income:   number;
  expense:  number;
  balance:  number;
}

export interface PersonTotals {
  persons:      PersonSummary[];
  totalIncome:  number;
  totalExpense: number;
  netBalance:   number;
}

// Request DTOs
export interface PersonRequest {
  name: string;
  age:  number;
}

export interface CategoryRequest {
  description: string;
  finalidade:  Finalidade;
}

export interface TransactionRequest {
  description:     string;
  amount:          number;
  transactionType: TransactionType;
  personId:        string;
  categoryId:      string;
}