import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Category } from '../types/inventory';

interface CategoryState {
  categories: Category[];
}

type CategoryAction =
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'UPDATE_CATEGORY'; payload: Category }
  | { type: 'DELETE_CATEGORY'; payload: string };

interface CategoryContextType {
  state: CategoryState;
  addCategory: (name: string, description?: string) => void;
  updateCategory: (id: string, name: string, description?: string) => void;
  deleteCategory: (id: string) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

function categoryReducer(state: CategoryState, action: CategoryAction): CategoryState {
  switch (action.type) {
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
        categories: state.categories.filter((category) => category.id !== action.payload),
      };

    default:
      return state;
  }
}

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(categoryReducer, {
    categories: [
      {
        id: '1',
        name: '染料',
        description: '各类染发产品',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: '洗护',
        description: '洗发和护发产品',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        name: '工具',
        description: '染发工具和设备',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  });

  const addCategory = (name: string, description?: string) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_CATEGORY', payload: newCategory });
  };

  const updateCategory = (id: string, name: string, description?: string) => {
    const updatedCategory: Category = {
      id,
      name,
      description,
      createdAt: state.categories.find((c) => c.id === id)?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'UPDATE_CATEGORY', payload: updatedCategory });
  };

  const deleteCategory = (id: string) => {
    dispatch({ type: 'DELETE_CATEGORY', payload: id });
  };

  return (
    <CategoryContext.Provider value={{ state, addCategory, updateCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
}