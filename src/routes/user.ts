import express from 'express';
import UserController from '../controllers/User';

const router = express.Router();
const userController = new UserController();

// GET all users
router.get('/', (req, res) => userController.getAll(req, res));

// GET user by ID
router.get('/:id', (req, res) => userController.getById(req, res));

// POST create new user
router.post('/', (req, res) => userController.create(req, res));

// DELETE user
router.delete('/:id', (req, res) => userController.delete(req, res));

// UPDATE user
router.put('/:id', (req, res) => userController.update(req, res));

export default router;