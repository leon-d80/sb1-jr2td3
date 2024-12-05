import { create } from 'zustand';
import { YouzanApi } from '../services/youzanApi';
import { useSettingsStore } from './settingsStore';

interface RevenueState {
  dailyRevenue: {
    [platform: string]: {
      revenue: number;
      orderCount: number;
      commission: number;
    };
  };
  isLoading: boolean;
  error: string | null;
  fetchDailyRevenue: (date: string) => Promise<void>;
}

export const useRevenueStore = create<RevenueState>((set) => ({
  dailyRevenue: {},
  isLoading: false,
  error: null,
  fetchDailyRevenue: async (date: string) => {
    set({ isLoading: true, error: null });
    try {
      const { apiConfigs } = useSettingsStore.getState();
      const youzanConfig = apiConfigs.find(config => config.type === 'youzan' && config.enabled);
      
      if (youzanConfig) {
        const youzanApi = new YouzanApi(youzanConfig);
        const youzanRevenue = await youzanApi.getDailyRevenue(date);
        
        set(state => ({
          dailyRevenue: {
            ...state.dailyRevenue,
            youzan: youzanRevenue,
          },
          isLoading: false,
        }));
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '获取收入数据失败',
        isLoading: false,
      });
    }
  },
}));