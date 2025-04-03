import { UserVote } from '../models/UserVote.js';
import pool from '../configs/database.js';

class UserVoteRepository {
    constructor() {}

    public async getAll(): Promise<UserVote[]> {
        try {
            const entities = await pool.query(
                "SELECT * \ FROM votes"
            );
            return entities;
        } catch (error) {
            console.error('votes: ' + error);
            throw new Error('An error occurred while retrieving all votes');
        }
    }

    public async getById(id: number): Promise<UserVote | null> {
        try {
            const [rows] = await pool.query(
                "SELECT * FROM votes WHERE id = ?", 
                [id]
            );
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('getById: ' + error);
            throw new Error('An error occurred while retrieving the vote by ID');
        }
    }

    public async getAllByUser(userId: number): Promise<UserVote[] | null> {
        try {
            const entities = await pool.query(
                "SELECT * \ FROM votes WHERE user_id = ?",
                [userId]
            );
            return entities;
        } catch (error) {
            console.error('votes: ' + error);
            throw new Error('An error occurred while retrieving all votes');
        }
    }

    public async getAllByRestaurant(restaurantId: number): Promise<UserVote[] | null> {
        try {
            const entities = await pool.query(
                "SELECT * \ FROM votes WHERE restaurant_id = ?",
                [restaurantId]
            );
            return entities;
        } catch (error) {
            console.error('votes: ' + error);
            throw new Error('An error occurred while retrieving all votes');
        }
    }

    public async create(userVote: UserVote): Promise<boolean> {
        try {
            const result: any = await pool.query(
                "INSERT INTO votes (user_id, restaurant_id, count) VALUES (?, ?, ?)",
                [userVote.getUserId(), userVote.getRestaurantId(), userVote.getVoteCount()]
            );
            
            return result.affectedRows > 0;
        } catch (e) {
            console.error("Error creating user vote:", e);
            throw e;
        }
    }

    public async update(id: number, userId: number, newValue: number): Promise<boolean> {
        try {
            const result: any = await pool.query(
                "UPDATE votes SET count = ? WHERE id = ? AND user_id = ?", 
                [newValue, id, userId]
            );

            return result.affectedRows > 0;
        } catch (error) {
            console.error('updateVote: ' + error);
            throw new Error('An error occurred while updating the vote');
        }
    }

    public async delete(userId: number, restaurantId: number): Promise<boolean> {
        try {
            const result: any = await pool.query(
                "DELETE FROM votes WHERE user_id = ? AND restaurant_id = ?", 
                [userId, restaurantId]
            );

            return result.affectedRows > 0;
        } catch (error) {
            console.error('delete: ' + error);
            throw new Error('An error occurred while deleting the vote');
        }
    }
}

export default UserVoteRepository;