import React from 'react';
import { DashboardCard } from './DashboardCard';
import { ExpenseBreakdown } from './ExpenseBreakdown';
import { PlatformMetrics } from './PlatformMetrics';
import { InventoryOverview } from './inventory/InventoryOverview';
import { ExpenseTable } from './expenses/ExpenseTable';
import { BarChart3, Wallet, TrendingDown, PiggyBank } from 'lucide-react';
import { FinancialMetrics, Expenses } from '../types/finance';
import { InventoryItem, InventoryAlert } from '../types/inventory';

interface DashboardProps {
  metrics: FinancialMetrics;
  expenses: Expenses;
}

export const Dashboard: React.FC<DashboardProps> = ({ metrics, expenses }) => {
  // Extended inventory data
  const sampleInventory: InventoryItem[] = [
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
  ];

  const sampleAlerts: InventoryAlert[] = [
    {
      type: 'low_stock',
      itemId: '1',
      message: '染发剂库存低于最小库存量（当前：15瓶，最小：20瓶）',
      severity: 'warning',
    },
    {
      type: 'reorder',
      itemId: '4',
      message: '染发工具套装接近最小库存量，建议补货',
      severity: 'warning',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="总收入"
          value={metrics.totalRevenue}
          icon={<BarChart3 className="w-6 h-6 text-blue-500" />}
        />
        <DashboardCard
          title="总支出"
          value={metrics.totalExpenses}
          icon={<Wallet className="w-6 h-6 text-red-500" />}
        />
        <DashboardCard
          title="净利润"
          value={metrics.netProfit}
          icon={<PiggyBank className="w-6 h-6 text-green-500" />}
        />
        <DashboardCard
          title="平台佣金"
          value={Object.values(metrics.platformMetrics).reduce(
            (sum, platform) => sum + platform.commission,
            0
          )}
          icon={<TrendingDown className="w-6 h-6 text-orange-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseBreakdown expenses={expenses} />
        <PlatformMetrics metrics={metrics} />
      </div>

      <InventoryOverview items={sampleInventory} alerts={sampleAlerts} />
      <ExpenseTable expenses={expenses} />
    </div>
  );
};