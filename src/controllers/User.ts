import { Request, Response } from 'express';
import UserService from '../services/User.js';
import { User } from '../models/User.js';

class UserController {
    private service: UserService;

    constructor() {
        this.service = new UserService();
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.service.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching all users:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async getById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const user = await this.service.getUserById(id);

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
            const success = await this.service.createUser({ name, role, age });
            
            if (success) {
                res.status(201).json({ message: 'User created successfully' });
            } else {
                res.status(400).json({ message: 'Failed to create user' });
            }
        } catch (error) {
            if (error instanceof Error && 
                (error.message.includes('incomplètes') || error.message.includes('invalide'))) {
                res.status(400).json({ message: error.message });
            } else {
                console.error('Error creating user:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            await this.service.deleteUser(id);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(`Error deleting user with id ${req.params.id}:`, error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10); 
            const { name, role, age } = req.body;

            if (isNaN(id)) {
                res.status(400).json({ message: 'ID invalide' });
                return;
            }

            const user = new User(id, name,role, age);
            await this.service.updateUser(user);

            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            console.error(`Error updating user with id ${req.params.id}:`, error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default UserController;