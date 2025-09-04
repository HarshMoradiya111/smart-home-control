export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
  date: Date;
  createdAt: Date;
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  period: 'monthly' | 'yearly';
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  type: 'income' | 'expense';
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  net: number;
}

export type TransactionAction = 
  | { type: 'ADD_TRANSACTION'; transaction: Omit<Transaction, 'id' | 'createdAt'> }
  | { type: 'UPDATE_TRANSACTION'; id: string; transaction: Partial<Transaction> }
  | { type: 'DELETE_TRANSACTION'; id: string }
  | { type: 'ADD_BUDGET'; budget: Omit<Budget, 'id' | 'spent' | 'createdAt'> }
  | { type: 'UPDATE_BUDGET'; id: string; budget: Partial<Budget> }
  | { type: 'DELETE_BUDGET'; id: string };