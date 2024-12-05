export interface ExpenseCategory {
  id: string;
  name: string;
  description?: string;
  type: 'fixed' | 'variable' | 'labor' | 'product';
}

export interface Expense {
  id: string;
  categoryId: string;
  name: string;  // Added expense name field
  amount: number;
  date: string;
  description?: string;
  receiptUrl?: string;
  ocrData?: {
    amount?: number;
    date?: string;
    vendor?: string;
    items?: Array<{
      description: string;
      amount: number;
    }>;
  };
}

export interface ExpenseFormData {
  categoryId: string;
  name: string;  // Added expense name field
  amount: number;
  date: string;
  description?: string;
  receipt?: File;
}