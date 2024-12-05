import { ApiConfig } from '../types/settings';

// Youzan API endpoints
const API_BASE_URL = 'https://open.youzan.com/api/oauthentry';

// API response types
interface YouzanResponse<T> {
  code: number;
  msg: string;
  data: T;
}

interface YouzanOrder {
  tid: string;
  status: string;
  payment: number;
  created: string;
  update_time: string;
  pay_time: string;
  type: string;
  buyer_id: string;
  buyer_name: string;
  receiver_name: string;
  receiver_tel: string;
  receiver_address: string;
  items: YouzanOrderItem[];
}

interface YouzanOrderItem {
  oid: string;
  title: string;
  num: number;
  price: number;
  payment: number;
}

export class YouzanApi {
  private config: ApiConfig;
  private accessToken: string | null = null;

  constructor(config: ApiConfig) {
    this.config = config;
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken) return this.accessToken;

    try {
      const response = await fetch(`${API_BASE_URL}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: this.config.apiKey,
          client_secret: this.config.apiSecret,
          grant_type: 'client_credentials',
        }),
      });

      const data = await response.json();
      this.accessToken = data.access_token;
      return this.accessToken;
    } catch (error) {
      console.error('Failed to get Youzan access token:', error);
      throw error;
    }
  }

  private async request<T>(endpoint: string, method: string = 'GET', params: any = {}): Promise<T> {
    const accessToken = await this.getAccessToken();
    const url = new URL(`${API_BASE_URL}/${endpoint}`);
    
    if (method === 'GET') {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const response = await fetch(url.toString(), {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      ...(method !== 'GET' && { body: JSON.stringify(params) }),
    });

    const data = await response.json();
    return data;
  }

  // Get orders within a date range
  async getOrders(startTime: string, endTime: string, page: number = 1, pageSize: number = 50) {
    const params = {
      start_created: startTime,
      end_created: endTime,
      page_no: page,
      page_size: pageSize,
    };

    return this.request<YouzanResponse<{
      items: YouzanOrder[];
      total_results: number;
    }>>('youzan.trades.sold.get', 'GET', params);
  }

  // Get order details
  async getOrderDetail(tid: string) {
    return this.request<YouzanResponse<YouzanOrder>>('youzan.trade.get', 'GET', { tid });
  }

  // Get daily revenue summary
  async getDailyRevenue(date: string) {
    const startTime = `${date} 00:00:00`;
    const endTime = `${date} 23:59:59`;
    
    const response = await this.getOrders(startTime, endTime);
    
    return {
      total_revenue: response.data.items.reduce((sum, order) => sum + order.payment, 0),
      order_count: response.data.items.length,
      commission: response.data.items.reduce((sum, order) => sum + order.payment * 0.006, 0), // 0.6% commission
    };
  }
}