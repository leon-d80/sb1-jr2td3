import { useEffect, useState } from 'react';
import { YouzanApi } from '../services/youzanApi';
import { useSettingsStore } from '../stores/settingsStore';

export function useYouzanApi() {
  const [api, setApi] = useState<YouzanApi | null>(null);
  const { apiConfigs } = useSettingsStore();

  useEffect(() => {
    const youzanConfig = apiConfigs.find(config => config.type === 'youzan' && config.enabled);
    if (youzanConfig) {
      setApi(new YouzanApi(youzanConfig));
    }
  }, [apiConfigs]);

  return api;
}