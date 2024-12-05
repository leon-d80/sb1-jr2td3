import React, { useEffect, useRef, useState } from 'react';
import { Modal } from '../../common/Modal';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Camera } from 'lucide-react';
import { InventoryItem } from '../../../types/inventory';

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanComplete: (barcode: string) => void;
  items: InventoryItem[];
}

export const ScannerModal: React.FC<ScannerModalProps> = ({
  isOpen,
  onClose,
  onScanComplete,
  items,
}) => {
  const [barcode, setBarcode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (isScanning && !scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        'reader',
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );

      scannerRef.current.render(
        (decodedText) => {
          setBarcode(decodedText);
          if (scannerRef.current) {
            scannerRef.current.clear();
          }
          setIsScanning(false);
        },
        (error) => {
          console.warn(error);
        }
      );
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    };
  }, [isScanning]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (barcode) {
      onScanComplete(barcode);
      onClose();
      setBarcode('');
      setIsScanning(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="扫码入库">
      <div className="space-y-4">
        {!isScanning ? (
          <button
            type="button"
            onClick={() => setIsScanning(true)}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Camera className="w-5 h-5 mr-2" />
            开启扫码
          </button>
        ) : (
          <div id="reader" className="w-full"></div>
        )}

        <form onSubmit={handleSubmit} className="mt-4">
          <div>
            <label htmlFor="barcode" className="block text-sm font-medium text-gray-700">
              条形码
            </label>
            <input
              type="text"
              id="barcode"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="请扫描商品条形码或手动输入"
            />
          </div>

          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              disabled={!barcode}
              className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:bg-gray-300 sm:ml-3 sm:w-auto"
            >
              确认
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              取消
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};