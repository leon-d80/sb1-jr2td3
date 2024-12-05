import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FinancialMetrics } from '../types/finance';

interface PlatformMetricsProps {
  metrics: FinancialMetrics;
}

export const PlatformMetrics: React.FC<PlatformMetricsProps> = ({ metrics }) => {
  const platformData = Object.entries(metrics.platformMetrics).map(([platform, data]) => ({
    name: platform === 'meituan' ? '美团' : platform === 'youzan' ? '有赞' : '抖音',
    收入: data.revenue,
    佣金: data.commission,
  }));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">平台收入分析</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={platformData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis 
              tickFormatter={(value) => 
                new Intl.NumberFormat('zh-CN', {
                  style: 'currency',
                  currency: 'CNY',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(value)
              }
            />
            <Tooltip 
              formatter={(value: number) => 
                new Intl.NumberFormat('zh-CN', {
                  style: 'currency',
                  currency: 'CNY'
                }).format(value)
              }
            />
            <Bar dataKey="收入" fill="#4F46E5" />
            <Bar dataKey="佣金" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};