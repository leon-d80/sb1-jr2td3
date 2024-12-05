import { Router } from 'express';
import { InventoryController } from '../controllers/inventory.js';

const router = Router();

// Get all inventory items
router.get('/', InventoryController.getAll);

// Get single inventory item
router.get('/:id', InventoryController.getById);

// Get inventory movements
router.get('/:id/movements', InventoryController.getMovements);

// Create inventory item
router.post('/', InventoryController.create);

// Update inventory item
router.put('/:id', InventoryController.update);

// Delete inventory item
router.delete('/:id', InventoryController.delete);

// Add stock to inventory item
router.post('/:id/add-stock', InventoryController.addStock);

// Remove stock from inventory item
router.post('/:id/remove-stock', InventoryController.removeStock);

export const inventoryRouter = router;