import { Request, Response } from 'express';
import UserModel, { User } from '../models/User.js';
import UserRepository from '../repositories/User.js';

class UserController {
    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.repository.getAll();
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching all users:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async getById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const user = await this.repository.getById(id);

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.status(200).json(user);
        } catch (error) {
            console.error(`Error fetching user with id ${req.params.id}:`, error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const { name, role, age } = req.body;
            
            // Validate required fields
            if (!name || !role || !age) {
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }

            // Create new user object (id will be assigned by the database)
            const newUser = new User(0, name, '', false, role, age);
            
            const success = await this.repository.create(newUser);
            
            if (success) {
                res.status(201).json({ message: 'User created successfully' });
            } else {
                res.status(400).json({ message: 'Failed to create user' });
            }
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            await this.repository.delete(id);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(`Error deleting user with id ${req.params.id}:`, error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default UserController;