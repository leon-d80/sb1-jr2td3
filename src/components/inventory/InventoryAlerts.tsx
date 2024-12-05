import React from 'react';
import { InventoryAlert } from '../../types/inventory';

interface InventoryAlertsProps {
  alerts: InventoryAlert[];
}

export const InventoryAlerts: React.FC<InventoryAlertsProps> = ({ alerts }) => {
  if (alerts.length === 0) return null;

  return (
    <div className="mt-4 p-4 bg-amber-50 rounded-lg">
      <h4 className="text-sm font-medium text-amber-800 mb-2">库存预警</h4>
      <div className="space-y-2">
        {alerts.map((alert) => (
          <div
            key={`${alert.itemId}-${alert.type}`}
            className="text-sm text-amber-700"
          >
            {alert.message}
          </div>
        ))}
      </div>
    </div>
  );
};