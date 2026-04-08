const db = require('../config/database');
const logger = require('../config/logger');

class DepartmentService {
    async getAllDepartments() {
        return await db.query('SELECT * FROM departments ORDER BY name ASC');
    }

    async createDepartment(name) {
        if (!name) throw new Error('El nombre es requerido');
        
        const result = await db.query('INSERT INTO departments (name) VALUES (?)', [name]);
        return { id: result.insertId, name };
    }

    async updateDepartment(id, name) {
        if (!name) throw new Error('El nombre es requerido');
        
        return await db.query('UPDATE departments SET name = ? WHERE id = ?', [name, id]);
    }

    async deleteDepartment(id) {
        return await db.query('DELETE FROM departments WHERE id = ?', [id]);
    }

    async syncFromDirectory() {
        // High performance sync: One single query to insert all missing departments
        const result = await db.query(`
            INSERT IGNORE INTO departments (name)
            SELECT DISTINCT TRIM(department) 
            FROM staff_directory 
            WHERE department IS NOT NULL AND TRIM(department) != ''
        `);
        
        // affectedRows in MySQL with INSERT IGNORE returns the number of inserted rows
        return result.affectedRows || 0;
    }

    async deleteAllDepartments() {
        return await db.query('DELETE FROM departments');
    }
}

module.exports = new DepartmentService();
