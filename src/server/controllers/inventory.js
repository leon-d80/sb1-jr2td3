import { InventoryModel } from '../models/inventory.js';
import { validateInventoryItem } from '../validators/inventory.js';

export class InventoryController {
  static async getAll(req, res) {
    try {
      const items = InventoryModel.getAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch inventory items' });
    }
  }

  static async getById(req, res) {
    try {
      const item = InventoryModel.getById(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch inventory item' });
    }
  }

  static async create(req, res) {
    try {
      const validatedData = validateInventoryItem(req.body);
      const newItem = InventoryModel.create(validatedData);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const validatedData = validateInventoryItem(req.body);
      const updatedItem = InventoryModel.update(req.params.id, validatedData);
      
      if (!updatedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      res.json(updatedItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const success = InventoryModel.delete(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete inventory item' });
    }
  }

  static async addStock(req, res) {
    try {
      const { quantity, notes } = req.body;
      if (typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({ error: 'Invalid quantity' });
      }

      const updatedItem = InventoryModel.addStock(req.params.id, quantity, notes);
      if (!updatedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }

      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add stock' });
    }
  }

  static async removeStock(req, res) {
    try {
      const { quantity, reason } = req.body;
      if (typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({ error: 'Invalid quantity' });
      }

      const updatedItem = InventoryModel.removeStock(req.params.id, quantity, reason);
      if (!updatedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }

      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: 'Failed to remove stock' });
    }
  }

  static async getMovements(req, res) {
    try {
      const movements = InventoryModel.getMovements(req.params.id);
      res.json(movements);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch inventory movements' });
    }
  }
}