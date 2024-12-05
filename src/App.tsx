import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { calculateFinancialMetrics } from './utils/calculations';
import { InventoryProvider } from './contexts/InventoryContext';
import { CategoryProvider } from './contexts/CategoryContext';
import { ExpenseProvider } from './contexts/ExpenseContext';
import { FloatingSidebar } from './components/navigation/FloatingSidebar';
import { LoginForm } from './components/auth/LoginForm';
import { StoreSwitcher } from './components/auth/StoreSwitcher';
import { useAuthStore } from './stores/authStore';
import { SettingsPanel } from './components/settings/SettingsPanel';

function App() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const [activeView, setActiveView] = useState<'dashboard' | 'inventory' | 'reports' | 'settings'>('dashboard');

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // Sample data based on the provided figures
  const sampleData = {
    revenue: {
      meituan: 60720,
      youzan: 15520,
      douyin: 0,
    },
    expenses: {
      fixed: {
        rent: 16622.44,
        advertising: 3000,
      },
      variable: {
        refunds: 541.25,
        purchases: 212.94,
      },
      labor: {
        employee1: 3807,
        employee2: 4492,
      },
      products: {
        shampoo: 40,
        dye: 980,
      },
    },
  };

  const metrics = calculateFinancialMetrics(sampleData.revenue, sampleData.expenses);

  const renderContent = () => {
    switch (activeView) {
      case 'settings':
        return <SettingsPanel />;
      case 'dashboard':
      default:
        return <Dashboard metrics={metrics} expenses={sampleData.expenses} />;
    }
  };

  return (
    <ExpenseProvider>
      <CategoryProvider>
        <InventoryProvider initialState={{
          items: [
            {
              id: '1',
              name: '染发剂',
              category: '染料',
              currentStock: 15,
              minStock: 20,
              unit: '瓶',
              unitPrice: 980,
              lastRestocked: '2024-02-20',
            },
            {
              id: '2',
              name: '洗发水',
              category: '洗护',
              currentStock: 25,
              minStock: 10,
              unit: '瓶',
              unitPrice: 40,
              lastRestocked: '2024-02-15',
            },
            {
              id: '3',
              name: '护发素',
              category: '洗护',
              currentStock: 18,
              minStock: 15,
              unit: '瓶',
              unitPrice: 45,
              lastRestocked: '2024-02-18',
            },
            {
              id: '4',
              name: '染发工具套装',
              category: '工具',
              currentStock: 8,
              minStock: 5,
              unit: '套',
              unitPrice: 120,
              lastRestocked: '2024-02-10',
            },
          ],
          movements: [],
          alerts: [],
        }}>
          <div className="min-h-screen bg-gray-50">
            <div className="relative">
              <StoreSwitcher />
              <div className="max-w-7xl mx-auto px-4 py-8">
                <header className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900">咔咔染财务管理系统</h1>
                  <p className="text-gray-500 mt-2">实时财务数据概览</p>
                </header>
                {renderContent()}
              </div>
              <FloatingSidebar onNavigate={setActiveView} />
            </div>
          </div>
        </InventoryProvider>
      </CategoryProvider>
    </ExpenseProvider>
  );
}

export default App;