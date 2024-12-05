import React, { useState } from 'react';
import { Package } from 'lucide-react';
import { useInventory } from '../../contexts/InventoryContext';
import { InventoryActions } from './InventoryActions';
import { InventoryStats } from './InventoryStats';
import { InventoryList } from './InventoryList';
import { InventoryAlerts } from './InventoryAlerts';
import { StockMovementHistory } from './StockMovementHistory';
import { ScannerModal } from './modals/ScannerModal';
import { AddStockModal } from './modals/AddStockModal';
import { RemoveStockModal } from './modals/RemoveStockModal';

export const InventoryOverview: React.FC = () => {
  const { state, addStock, removeStock } = useInventory();
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isAddStockOpen, setIsAddStockOpen] = useState(false);
  const [isRemoveStockOpen, setIsRemoveStockOpen] = useState(false);

  const handleScanComplete = (barcode: string) => {
    const item = state.items.find((item) => item.id === barcode);
    if (item) {
      setIsAddStockOpen(true);
    } else {
      alert('未找到对应商品，请手动选择或添加新商品。');
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Package className="w-6 h-6 text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold">库存管理</h3>
        </div>
        <InventoryActions
          onScan={() => setIsScannerOpen(true)}
          onAddStock={() => setIsAddStockOpen(true)}
          onRemoveStock={() => setIsRemoveStockOpen(true)}
        />
      </div>

      <InventoryStats items={state.items} />
      <InventoryList items={state.items} />
      <InventoryAlerts alerts={state.alerts} />
      <StockMovementHistory movements={state.movements} items={state.items} />

      <ScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanComplete={handleScanComplete}
        items={state.items}
      />

      <AddStockModal
        isOpen={isAddStockOpen}
        onClose={() => setIsAddStockOpen(false)}
        items={state.items}
        onAddStock={addStock}
      />

      <RemoveStockModal
        isOpen={isRemoveStockOpen}
        onClose={() => setIsRemoveStockOpen(false)}
        items={state.items}
        onRemoveStock={removeStock}
      />
    </div>
  );
};