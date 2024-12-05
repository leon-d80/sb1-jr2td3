import { Revenue, Expenses, FinancialMetrics } from '../types/finance';

export const COMMISSION_RATES = {
  meituan: 0.035,
  youzan: 0.006,
  douyin: 0.15,
};

export const calculateFinancialMetrics = (
  revenue: Revenue,
  expenses: Expenses
): FinancialMetrics => {
  const platformMetrics = {
    meituan: {
      revenue: revenue.meituan,
      commission: revenue.meituan * COMMISSION_RATES.meituan,
      commissionRate: COMMISSION_RATES.meituan,
    },
    youzan: {
      revenue: revenue.youzan,
      commission: revenue.youzan * COMMISSION_RATES.youzan,
      commissionRate: COMMISSION_RATES.youzan,
    },
    douyin: {
      revenue: revenue.douyin,
      commission: revenue.douyin * COMMISSION_RATES.douyin,
      commissionRate: COMMISSION_RATES.douyin,
    },
  };

  const totalRevenue = Object.values(revenue).reduce((sum, val) => sum + val, 0);
  const totalCommissions = Object.values(platformMetrics).reduce(
    (sum, platform) => sum + platform.commission,
    0
  );

  const totalFixedExpenses = Object.values(expenses.fixed).reduce(
    (sum, val) => sum + val,
    0
  );
  const totalVariableExpenses = Object.values(expenses.variable).reduce(
    (sum, val) => sum + val,
    0
  );
  const totalLaborCosts = Object.values(expenses.labor).reduce(
    (sum, val) => sum + val,
    0
  );
  const totalProductCosts = Object.values(expenses.products).reduce(
    (sum, val) => sum + val,
    0
  );

  const totalExpenses =
    totalFixedExpenses +
    totalVariableExpenses +
    totalLaborCosts +
    totalProductCosts +
    totalCommissions;

  return {
    totalRevenue,
    totalExpenses,
    netProfit: totalRevenue - totalExpenses,
    platformMetrics,
  };
};