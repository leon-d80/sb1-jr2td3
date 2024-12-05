import { z } from 'zod';

const inventoryItemSchema = z.object({
  name: z.string().min(1, '商品名称不能为空'),
  category: z.string().min(1, '类别不能为空'),
  currentStock: z.number().int().min(0, '库存数量不能为负数'),
  minStock: z.number().int().min(0, '最小库存不能为负数'),
  unit: z.string().min(1, '单位不能为空'),
  unitPrice: z.number().min(0, '单价不能为负数'),
});

export function validateInventoryItem(data) {
  return inventoryItemSchema.parse(data);
}