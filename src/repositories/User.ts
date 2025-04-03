import User from '../models/User.js';
import pool from '../configs/database.js';

class UserRepository {
    constructor() {}

    public async getAll(): Promise<User[]> {
        try {
            const entities = await pool.query(
                "SELECT * \
                FROM Users"
            );
            return entities;
        } catch (error) {
            console.error('getAll: ' + error);
            throw new Error('An error occurred while retrieving all entities');
        }
    }

    public async getById(id: string): Promise<User | null> {
        try {
            const [rows] = await pool.query("SELECT * FROM Users WHERE id = ?", [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('getById: ' + error);
            throw new Error('An error occurred while retrieving the entity by ID');
        }
    }

    public async create(user:User): Promise<boolean> {
        try {
            const result: any = await pool.query(
                'INSERT INTO user (name, role, age) VALUES (?, ?, ?)',
                [user.getName(), user.getRole(), user.getAge()]
            );
            return result.affectedRows > 0;
        } catch (e) {
            console.error("Error creating user:", e);
            throw e;
        }
    }

    public async delete(id: string): Promise<void> {
        try {
            await pool.query("DELETE FROM Users WHERE id = ?", [id]);
        } catch (error) {
            console.error('delete: ' + error);
            throw new Error('An error occurred while deleting the entity');
        }
    }
}

export default UserRepository;