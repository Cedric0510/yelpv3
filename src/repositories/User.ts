import {User} from '../models/User.js';
import pool from '../configs/database.js';

class UserRepository {
    constructor() {}

    public async getAll(): Promise<User[]> {
        try {
            const [rows] = await pool.query("SELECT * FROM users");
            
            // Mapper les résultats bruts en objets User
            return rows.map((row: any) => 
                new User(row.id, row.name,row.role, row.age)
            );
        } catch (error) {
            console.error('getAll: ' + error);
            throw new Error('An error occurred while retrieving all entities');
        }
    }

    public async getById(id: number): Promise<User | null> {
        try {
            const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
            const row = rows[0];
            return row ? new User(row.id, row.name,row.role, row.age) : null;
        } catch (error) {
            console.error('getById: ' + error);
            throw new Error('An error occurred while retrieving the entity by ID');
        }
    }

    public async create(user:User): Promise<boolean> {
        try {
            const result: any = await pool.query(
                'INSERT INTO users (name, role, age) VALUES (?, ?, ?)',
                [user.getName(), user.getRole(), user.getAge()]
            );
            return result.affectedRows > 0;
        } catch (e) {
            console.error("Error creating user:", e);
            throw e;
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            await pool.query("DELETE FROM users WHERE id = ?", [id]);
        } catch (error) {
            console.error('delete: ' + error);
            throw new Error('An error occurred while deleting the entity');
        }
    }

    public async update(user: User): Promise<void> {
        try {
            await pool.query(
                'UPDATE users SET name = ?, role = ?, age = ? WHERE id = ?',
                [user.getName(), user.getRole(), user.getAge(), user.getId()]
            );
        } catch (error) {
            console.error('update: ' + error);
            throw new Error('An error occurred while updating the entity');
        }
    }
}

export default UserRepository;