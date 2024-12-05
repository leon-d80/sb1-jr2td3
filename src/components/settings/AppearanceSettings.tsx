import React from 'react';
import { useSettingsStore } from '../../stores/settingsStore';
import { Logo } from '../common/Logo';

export const AppearanceSettings: React.FC = () => {
  const { settings, updateSettings } = useSettingsStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Logo 设置</h3>
        <div className="mt-4">
          <Logo showUpload size="large" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">主题设置</h3>
        <div className="mt-4 grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              主题色
            </label>
            <input
              type="color"
              value={settings.theme.primaryColor}
              onChange={(e) =>
                updateSettings({
                  theme: { ...settings.theme, primaryColor: e.target.value },
                })
              }
              className="mt-1 block w-20 h-8 p-1 rounded-md border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              强调色
            </label>
            <input
              type="color"
              value={settings.theme.accentColor}
              onChange={(e) =>
                updateSettings({
                  theme: { ...settings.theme, accentColor: e.target.value },
                })
              }
              className="mt-1 block w-20 h-8 p-1 rounded-md border border-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};