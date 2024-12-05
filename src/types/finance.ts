export interface Revenue {
  meituan: number;
  youzan: number;
  douyin: number;
}

export interface Expenses {
  fixed: {
    rent: number;
    advertising: number;
    [key: string]: number;
  };
  variable: {
    refunds: number;
    purchases: number;
    [key: string]: number;
  };
  labor: {
    [employeeName: string]: number;
  };
  products: {
    [productName: string]: number;
  };
}

export interface FinancialMetrics {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  platformMetrics: {
    [platform: string]: {
      revenue: number;
      commission: number;
      commissionRate: number;
    };
  };
}