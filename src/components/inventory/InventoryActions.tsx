import React from 'react';
import { Barcode, Plus, Minus } from 'lucide-react';

interface InventoryActionsProps {
  onScan: () => void;
  onAddStock: () => void;
  onRemoveStock: () => void;
}

export const InventoryActions: React.FC<InventoryActionsProps> = ({
  onScan,
  onAddStock,
  onRemoveStock,
}) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={onScan}
        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        <Barcode className="w-4 h-4 mr-2" />
        扫码
      </button>
      <button
        onClick={onAddStock}
        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
      >
        <Plus className="w-4 h-4 mr-2" />
        入库
      </button>
      <button
        onClick={onRemoveStock}
        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
      >
        <Minus className="w-4 h-4 mr-2" />
        出库
      </button>
    </div>
  );
};