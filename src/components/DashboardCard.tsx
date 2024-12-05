import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: number;
  change?: number;
  icon: React.ReactNode;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  change,
  icon,
}) => {
  const formatter = new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
  });

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <div className="p-2 bg-blue-50 rounded-lg">{icon}</div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-semibold">{formatter.format(value)}</p>
          {change !== undefined && (
            <div
              className={`flex items-center text-sm ${
                change >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {change >= 0 ? (
                <ArrowUpIcon className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDownIcon className="w-4 h-4 mr-1" />
              )}
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};