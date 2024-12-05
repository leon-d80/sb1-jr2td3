import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Expense, ExpenseCategory } from '../types/expense';

interface ExpenseState {
  expenses: Expense[];
  categories: ExpenseCategory[];
}

type ExpenseAction =
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'UPDATE_EXPENSE'; payload: Expense }
  | { type: 'DELETE_EXPENSE'; payload: string }
  | { type: 'ADD_CATEGORY'; payload: ExpenseCategory }
  | { type: 'UPDATE_CATEGORY'; payload: ExpenseCategory }
  | { type: 'DELETE_CATEGORY'; payload: string };

interface ExpenseContextType {
  state: ExpenseState;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  addCategory: (category: Omit<ExpenseCategory, 'id'>) => void;
  updateCategory: (id: string, category: Partial<ExpenseCategory>) => void;
  deleteCategory: (id: string) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

function expenseReducer(state: ExpenseState, action: ExpenseAction): ExpenseState {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };

    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };

    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.payload),
      };

    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };

    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.id ? action.payload : category
        ),
      };

    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
      };

    default:
      return state;
  }
}

const initialCategories: ExpenseCategory[] = [
  {
    id: '1',
    name: '房租',
    type: 'fixed',
    description: '店铺租金',
  },
  {
    id: '2',
    name: '广告费',
    type: 'fixed',
    description: '线上和线下广告支出',
  },
  {
    id: '3',
    name: '退款',
    type: 'variable',
    description: '客户退款',
  },
  {
    id: '4',
    name: '工资',
    type: 'labor',
    description: '员工工资',
  },
];

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(expenseReducer, {
    expenses: [],
    categories: initialCategories,
  });

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
    };
    dispatch({ type: 'ADD_EXPENSE', payload: newExpense });
  };

  const updateExpense = (id: string, expense: Partial<Expense>) => {
    const existingExpense = state.expenses.find((e) => e.id === id);
    if (existingExpense) {
      const updatedExpense: Expense = {
        ...existingExpense,
        ...expense,
      };
      dispatch({ type: 'UPDATE_EXPENSE', payload: updatedExpense });
    }
  };

  const deleteExpense = (id: string) => {
    dispatch({ type: 'DELETE_EXPENSE', payload: id });
  };

  const addCategory = (category: Omit<ExpenseCategory, 'id'>) => {
    const newCategory: ExpenseCategory = {
      ...category,
      id: Date.now().toString(),
    };
    dispatch({ type: 'ADD_CATEGORY', payload: newCategory });
  };

  const updateCategory = (id: string, category: Partial<ExpenseCategory>) => {
    const existingCategory = state.categories.find((c) => c.id === id);
    if (existingCategory) {
      const updatedCategory: ExpenseCategory = {
        ...existingCategory,
        ...category,
      };
      dispatch({ type: 'UPDATE_CATEGORY', payload: updatedCategory });
    }
  };

  const deleteCategory = (id: string) => {
    dispatch({ type: 'DELETE_CATEGORY', payload: id });
  };

  return (
    <ExpenseContext.Provider
      value={{
        state,
        addExpense,
        updateExpense,
        deleteExpense,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
}