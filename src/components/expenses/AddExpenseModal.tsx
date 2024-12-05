import React, { useState, useRef } from 'react';
import { Modal } from '../common/Modal';
import { useExpense } from '../../contexts/ExpenseContext';
import { ExpenseFormData } from '../../types/expense';
import { Camera, Upload, Receipt } from 'lucide-react';
import { format } from 'date-fns';
import Webcam from 'react-webcam';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ isOpen, onClose }) => {
  const { state, addExpense } = useExpense();
  const [formData, setFormData] = useState<ExpenseFormData>({
    categoryId: '',
    name: '',  // Added expense name field
    amount: 0,
    date: format(new Date(), 'yyyy-MM-dd'),
    description: '',
  });
  const [receipt, setReceipt] = useState<File | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const [amountInput, setAmountInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert empty string to 0
    const amount = amountInput === '' ? 0 : parseFloat(amountInput);
    
    addExpense({
      ...formData,
      amount,
      receiptUrl: receipt ? URL.createObjectURL(receipt) : undefined,
    });
    
    onClose();
    setFormData({
      categoryId: '',
      name: '',  // Reset expense name
      amount: 0,
      date: format(new Date(), 'yyyy-MM-dd'),
      description: '',
    });
    setAmountInput('');
    setReceipt(null);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string or valid numbers
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmountInput(value);
      setFormData(prev => ({
        ...prev,
        amount: value === '' ? 0 : parseFloat(value)
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceipt(e.target.files[0]);
      // Here you would typically process the receipt with OCR
    }
  };

  const captureReceipt = React.useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        // Convert base64 to file
        fetch(imageSrc)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], 'receipt.jpg', { type: 'image/jpeg' });
            setReceipt(file);
            setIsCapturing(false);
            // Here you would typically process the receipt with OCR
          });
      }
    }
  }, [webcamRef]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="添加支出">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            支出类别
          </label>
          <select
            id="category"
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="">选择类别</option>
            {state.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            支出名称
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="输入支出名称"
            required
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            金额
          </label>
          <input
            type="text"
            id="amount"
            value={amountInput}
            onChange={handleAmountChange}
            placeholder="0.00"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            日期
          </label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            描述
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            上传凭证
          </label>
          <div className="flex space-x-2">
            <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <Upload className="w-4 h-4 mr-2" />
              选择文件
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <button
              type="button"
              onClick={() => setIsCapturing(!isCapturing)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Camera className="w-4 h-4 mr-2" />
              {isCapturing ? '取消拍照' : '拍照'}
            </button>
          </div>

          {isCapturing && (
            <div className="mt-4">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full rounded-lg"
              />
              <button
                type="button"
                onClick={captureReceipt}
                className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Camera className="w-4 h-4 mr-2" />
                拍照
              </button>
            </div>
          )}

          {receipt && !isCapturing && (
            <div className="mt-2 flex items-center">
              <Receipt className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">{receipt.name}</span>
            </div>
          )}
        </div>

        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
          >
            添加支出
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
    </Modal>
  );
};