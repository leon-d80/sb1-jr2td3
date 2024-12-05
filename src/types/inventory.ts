export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  unit: string;
  unitPrice: number;
  lastRestocked: string;
}

export interface StockMovement {
  id: string;
  itemId: string;
  type: 'in' | 'out';
  quantity: number;
  date: string;
  notes?: string;
}

export interface InventoryAlert {
  type: 'low_stock' | 'expired' | 'reorder';
  itemId: string;
  message: string;
  severity: 'warning' | 'error';
}