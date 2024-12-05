import { getDatabase } from '../database/init.js';
import { generateId } from '../utils/ids.js';

export class InventoryModel {
  static getAll() {
    const db = getDatabase();
    return db.prepare('SELECT * FROM inventory ORDER BY name').all();
  }

  static getById(id) {
    const db = getDatabase();
    return db.prepare('SELECT * FROM inventory WHERE id = ?').get(id);
  }

  static create(data) {
    const db = getDatabase();
    const id = generateId();
    
    const result = db.prepare(`
      INSERT INTO inventory (
        id, name, category, current_stock, min_stock, 
        unit, unit_price, last_restocked
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).run(
      id,
      data.name,
      data.category,
      data.currentStock,
      data.minStock,
      data.unit,
      data.unitPrice
    );

    return this.getById(id);
  }

  static update(id, data) {
    const db = getDatabase();
    
    const result = db.prepare(`
      UPDATE inventory 
      SET name = ?, 
          category = ?, 
          current_stock = ?, 
          min_stock = ?, 
          unit = ?, 
          unit_price = ?, 
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      data.name,
      data.category,
      data.currentStock,
      data.minStock,
      data.unit,
      data.unitPrice,
      id
    );

    return result.changes > 0 ? this.getById(id) : null;
  }

  static delete(id) {
    const db = getDatabase();
    const result = db.prepare('DELETE FROM inventory WHERE id = ?').run(id);
    return result.changes > 0;
  }

  static addStock(id, quantity, notes) {
    const db = getDatabase();
    
    db.transaction(() => {
      // Update inventory stock
      db.prepare(`
        UPDATE inventory 
        SET current_stock = current_stock + ?,
            last_restocked = CURRENT_TIMESTAMP,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(quantity, id);

      // Record movement
      db.prepare(`
        INSERT INTO inventory_movements (
          id, item_id, type, quantity, date, notes
        )
        VALUES (?, ?, 'in', ?, CURRENT_TIMESTAMP, ?)
      `).run(generateId(), id, quantity, notes);
    })();

    return this.getById(id);
  }

  static removeStock(id, quantity, reason) {
    const db = getDatabase();
    
    db.transaction(() => {
      // Update inventory stock
      db.prepare(`
        UPDATE inventory 
        SET current_stock = current_stock - ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(quantity, id);

      // Record movement
      db.prepare(`
        INSERT INTO inventory_movements (
          id, item_id, type, quantity, date, notes
        )
        VALUES (?, ?, 'out', ?, CURRENT_TIMESTAMP, ?)
      `).run(generateId(), id, quantity, reason);
    })();

    return this.getById(id);
  }

  static getMovements(itemId) {
    const db = getDatabase();
    return db.prepare(`
      SELECT * FROM inventory_movements 
      WHERE item_id = ? 
      ORDER BY date DESC
    `).all(itemId);
  }
}