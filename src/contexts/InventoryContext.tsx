import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { InventoryItem, StockMovement, InventoryAlert } from '../types/inventory';

interface InventoryState {
  items: InventoryItem[];
  movements: StockMovement[];
  alerts: InventoryAlert[];
}

type InventoryAction =
  | { type: 'ADD_STOCK'; payload: { itemId: string; quantity: number; notes?: string } }
  | { type: 'REMOVE_STOCK'; payload: { itemId: string; quantity: number; reason: string } }
  | { type: 'ADD_PRODUCT'; payload: InventoryItem }
  | { type: 'UPDATE_ALERTS' };

interface InventoryContextType {
  state: InventoryState;
  addStock: (itemId: string, quantity: number, notes?: string) => void;
  removeStock: (itemId: string, quantity: number, reason: string) => void;
  addProduct: (product: InventoryItem) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

function inventoryReducer(state: InventoryState, action: InventoryAction): InventoryState {
  switch (action.type) {
    case 'ADD_STOCK': {
      const { itemId, quantity, notes } = action.payload;
      const updatedItems = state.items.map((item) =>
        item.id === itemId
          ? { ...item, currentStock: item.currentStock + quantity, lastRestocked: new Date().toISOString() }
          : item
      );

      const newMovement: StockMovement = {
        id: Date.now().toString(),
        itemId,
        type: 'in',
        quantity,
        date: new Date().toISOString(),
        notes,
      };

      return {
        ...state,
        items: updatedItems,
        movements: [...state.movements, newMovement],
      };
    }

    case 'REMOVE_STOCK': {
      const { itemId, quantity, reason } = action.payload;
      const updatedItems = state.items.map((item) =>
        item.id === itemId
          ? { ...item, currentStock: item.currentStock - quantity }
          : item
      );

      const newMovement: StockMovement = {
        id: Date.now().toString(),
        itemId,
        type: 'out',
        quantity,
        date: new Date().toISOString(),
        notes: reason,
      };

      return {
        ...state,
        items: updatedItems,
        movements: [...state.movements, newMovement],
      };
    }

    case 'ADD_PRODUCT': {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case 'UPDATE_ALERTS': {
      const newAlerts: InventoryAlert[] = state.items
        .filter((item) => item.currentStock <= item.minStock)
        .map((item) => ({
          type: 'low_stock',
          itemId: item.id,
          message: `${item.name}库存低于最小库存量（当前：${item.currentStock}${item.unit}，最小：${item.minStock}${item.unit}）`,
          severity: item.currentStock === 0 ? 'error' : 'warning',
        }));

      return {
        ...state,
        alerts: newAlerts,
      };
    }

    default:
      return state;
  }
}

export function InventoryProvider({ children, initialState }: { children: ReactNode; initialState: InventoryState }) {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  const addStock = (itemId: string, quantity: number, notes?: string) => {
    dispatch({ type: 'ADD_STOCK', payload: { itemId, quantity, notes } });
    dispatch({ type: 'UPDATE_ALERTS' });
  };

  const removeStock = (itemId: string, quantity: number, reason: string) => {
    dispatch({ type: 'REMOVE_STOCK', payload: { itemId, quantity, reason } });
    dispatch({ type: 'UPDATE_ALERTS' });
  };

  const addProduct = (product: InventoryItem) => {
    dispatch({ type: 'ADD_PRODUCT', payload: product });
    dispatch({ type: 'UPDATE_ALERTS' });
  };

  return (
    <InventoryContext.Provider value={{ state, addStock, removeStock, addProduct }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
}