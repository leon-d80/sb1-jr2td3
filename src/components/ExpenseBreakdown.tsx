import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Expenses } from '../types/finance';

interface ExpenseBreakdownProps {
  expenses: Expenses;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const ExpenseBreakdown: React.FC<ExpenseBreakdownProps> = ({ expenses }) => {
  const expenseData = [
    {
      name: '固定支出',
      value: Object.values(expenses.fixed).reduce((sum, val) => sum + val, 0),
    },
    {
      name: '变动支出',
      value: Object.values(expenses.variable).reduce((sum, val) => sum + val, 0),
    },
    {
      name: '人工成本',
      value: Object.values(expenses.labor).reduce((sum, val) => sum + val, 0),
    },
    {
      name: '产品成本',
      value: Object.values(expenses.products).reduce((sum, val) => sum + val, 0),
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">支出分析</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={expenseData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {expenseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => 
                new Intl.NumberFormat('zh-CN', {
                  style: 'currency',
                  currency: 'CNY'
                }).format(value)
              }
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};