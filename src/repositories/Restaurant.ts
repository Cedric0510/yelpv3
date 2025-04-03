import pool from "../configs/database.js";
import Restaurant from "../models/Restaurant.js";

class RestaurantRepository {
    constructor() {}

    public async getAll(): Promise<Restaurant[]> {
        try {
            const rows: any[] = await pool.query('SELECT * FROM restaurant');
            return rows.map((restaurant: any) => new Restaurant(
                restaurant.id,
                restaurant.name,
                restaurant.address,
                restaurant.type
            ));
        } catch (e) {
            throw new Error(`Error updating restaurant: ${e as Error}.message`);
        }
    }

    public async getById(id: number): Promise<Restaurant | undefined> {
        try {
            const rows: any[] = await pool.query('SELECT * FROM restaurant WHERE id = ?', [id]);
            if (rows.length > 0) {
                const restaurant = rows[0];
                return new Restaurant(
                    restaurant.id,
                    restaurant.name,
                    restaurant.address,
                    restaurant.type
                );
            }
            return undefined;
        } catch (e) {
            throw new Error(`Error fetching restaurant with id ${id}: ${e as Error}.message`);
        }
    }

    public async create(r: Restaurant): Promise<boolean> {
        try {
            const result: any = await pool.query(
                'INSERT INTO restaurant (name, type, address) VALUES (?, ?, ?)',
                [r.getName(), r.getType(), r.getAddress()]
            );
            return result.affectedRows > 0;
        } catch (e) {
            console.error("Error creating restaurant:", e);
            throw new Error(`Error creating restaurant ${e as Error}.message`);
        }
    }

    public async update(r: Restaurant): Promise<boolean> {
        try {
            const result: any = await pool.query(
                'UPDATE restaurant SET name = ?, type = ?, address = ? WHERE id = ?',
                [r.getName(), r.getType(), r.getAddress(), r.getId()]
            );
            return result.affectedRows > 0;
        } catch (e) {
            throw new Error(`Error updating restaurant with id ${r.getId()}: ${e as Error}.message`);
        }
    }

    public async delete(id: number): Promise<boolean> {
        try {
            const result: any = await pool.query('DELETE FROM restaurant WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (e) {
            throw new Error(`Error deleting restaurant with id ${id}: ${e as Error}.message`);
        }
    }
}

export default RestaurantRepository;