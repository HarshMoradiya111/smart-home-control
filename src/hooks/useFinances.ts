import { useState, useEffect, useCallback, useMemo } from 'react';
import { Transaction, Budget, Category, FinancialSummary, MonthlyData, TransactionAction } from '@/types/finance';

// Mock data for demonstration
const initialCategories: Category[] = [
  { id: '1', name: 'Food & Dining', color: '#ef4444', icon: '🍽️', type: 'expense' },
  { id: '2', name: 'Transportation', color: '#3b82f6', icon: '🚗', type: 'expense' },
  { id: '3', name: 'Shopping', color: '#8b5cf6', icon: '🛍️', type: 'expense' },
  { id: '4', name: 'Entertainment', color: '#f59e0b', icon: '🎬', type: 'expense' },
  { id: '5', name: 'Bills & Utilities', color: '#10b981', icon: '⚡', type: 'expense' },
  { id: '6', name: 'Healthcare', color: '#ec4899', icon: '🏥', type: 'expense' },
  { id: '7', name: 'Salary', color: '#059669', icon: '💼', type: 'income' },
  { id: '8', name: 'Freelance', color: '#0891b2', icon: '💻', type: 'income' },
  { id: '9', name: 'Investment', color: '#7c3aed', icon: '📈', type: 'income' }
];

const initialTransactions: Transaction[] = [
  {
    id: '1',
    amount: 5000,
    description: 'Monthly Salary',
    category: 'Salary',
    type: 'income',
    date: new Date('2024-01-01'),
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    amount: 45,
    description: 'Grocery Shopping',
    category: 'Food & Dining',
    type: 'expense',
    date: new Date('2024-01-02'),
    createdAt: new Date('2024-01-02')
  },
  {
    id: '3',
    amount: 25,
    description: 'Gas Station',
    category: 'Transportation',
    type: 'expense',
    date: new Date('2024-01-03'),
    createdAt: new Date('2024-01-03')
  },
  {
    id: '4',
    amount: 120,
    description: 'Electricity Bill',
    category: 'Bills & Utilities',
    type: 'expense',
    date: new Date('2024-01-05'),
    createdAt: new Date('2024-01-05')
  },
  {
    id: '5',
    amount: 80,
    description: 'Restaurant Dinner',
    category: 'Food & Dining',
    type: 'expense',
    date: new Date('2024-01-07'),
    createdAt: new Date('2024-01-07')
  }
];

const initialBudgets: Budget[] = [
  {
    id: '1',
    category: 'Food & Dining',
    amount: 500,
    spent: 125,
    period: 'monthly',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    category: 'Transportation',
    amount: 200,
    spent: 25,
    period: 'monthly',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '3',
    category: 'Entertainment',
    amount: 150,
    spent: 0,
    period: 'monthly',
    createdAt: new Date('2024-01-01')
  }
];

export const useFinances = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [categories] = useState<Category[]>(initialCategories);

  // Update budget spent amounts when transactions change
  useEffect(() => {
    setBudgets(prevBudgets => 
      prevBudgets.map(budget => ({
        ...budget,
        spent: transactions
          .filter(t => t.type === 'expense' && t.category === budget.category)
          .reduce((sum, t) => sum + t.amount, 0)
      }))
    );
  }, [transactions]);

  const dispatchAction = useCallback((action: TransactionAction) => {
    switch (action.type) {
      case 'ADD_TRANSACTION':
        setTransactions(prev => [
          ...prev,
          {
            ...action.transaction,
            id: Date.now().toString(),
            createdAt: new Date()
          }
        ]);
        break;
      case 'UPDATE_TRANSACTION':
        setTransactions(prev => 
          prev.map(t => t.id === action.id ? { ...t, ...action.transaction } : t)
        );
        break;
      case 'DELETE_TRANSACTION':
        setTransactions(prev => prev.filter(t => t.id !== action.id));
        break;
      case 'ADD_BUDGET':
        setBudgets(prev => [
          ...prev,
          {
            ...action.budget,
            id: Date.now().toString(),
            spent: 0,
            createdAt: new Date()
          }
        ]);
        break;
      case 'UPDATE_BUDGET':
        setBudgets(prev => 
          prev.map(b => b.id === action.id ? { ...b, ...action.budget } : b)
        );
        break;
      case 'DELETE_BUDGET':
        setBudgets(prev => prev.filter(b => b.id !== action.id));
        break;
    }
  }, []);

  const financialSummary: FinancialSummary = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyIncome = transactions
      .filter(t => t.type === 'income' && 
        t.date.getMonth() === currentMonth && 
        t.date.getFullYear() === currentYear)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const monthlyExpenses = transactions
      .filter(t => t.type === 'expense' && 
        t.date.getMonth() === currentMonth && 
        t.date.getFullYear() === currentYear)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpenses,
      netIncome: totalIncome - totalExpenses,
      monthlyIncome,
      monthlyExpenses,
      savingsRate: monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100 : 0
    };
  }, [transactions]);

  const monthlyData: MonthlyData[] = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    
    return months.map((month, index) => {
      const monthTransactions = transactions.filter(t => 
        t.date.getMonth() === index && t.date.getFullYear() === currentYear
      );
      
      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      
      return {
        month,
        income,
        expenses,
        net: income - expenses
      };
    });
  }, [transactions]);

  const expensesByCategory = useMemo(() => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
        return acc;
      }, {} as Record<string, number>);
  }, [transactions]);

  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5);
  }, [transactions]);

  return {
    transactions,
    budgets,
    categories,
    financialSummary,
    monthlyData,
    expensesByCategory,
    recentTransactions,
    dispatchAction
  };
};