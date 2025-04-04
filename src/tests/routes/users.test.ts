import request from 'supertest';
import express, { Request, Response } from 'express';
import UserController from '../../controllers/User'; // Le mock sera automatiquement utilisé
import userRoutes from '../../routes/user';
import { jest } from '@jest/globals';

jest.mock('../../controllers/User'); // Force Jest à utiliser le mock

describe('User Routes', () => {
  let app: express.Express;
  let mockUserController: any;

  beforeEach(() => {
    // Réinitialiser l'app avant chaque test
    app = express();
    app.use(express.json());
    app.use('/api/users', userRoutes);

    // Récupérer le mock du contrôleur
    mockUserController = require('../../controllers/User').default();

    // Réinitialiser les méthodes mockées
    jest.clearAllMocks();
  });

  describe('GET /api/users', () => {
    it('devrait appeler la méthode getAll du contrôleur', async () => {
      // Arrange
      mockUserController.getAll.mockImplementation((_req: Request, res: Response) => {
        res.status(200).json([{ id: 1, name: 'Test User' }]);
      });

      // Act
      const response = await request(app).get('/api/users');

      // Assert
      expect(response.status).toBe(200);
      expect(mockUserController.getAll).toHaveBeenCalledTimes(1);
      expect(response.body).toEqual([{ id: 1, name: 'Test User' }]);
    });
  });

  describe('GET /api/users/:id', () => {
    it('devrait appeler la méthode getById du contrôleur', async () => {
      // Arrange
      mockUserController.getById.mockImplementation((_req: Request, res: Response) => {
        res.status(200).json({ id: 1, name: 'Test User' });
      });

      // Act
      const response = await request(app).get('/api/users/1');

      // Assert
      expect(response.status).toBe(200);
      expect(mockUserController.getById).toHaveBeenCalledTimes(1);
      expect(response.body).toEqual({ id: 1, name: 'Test User' });
    });
  });

  describe('POST /api/users', () => {
    it('devrait appeler la méthode create du contrôleur', async () => {
      // Arrange
      const userData = { name: 'New User', role: 'user', age: 30 };
      mockUserController.create.mockImplementation((_req: Request, res: Response) => {
        res.status(201).json({ message: 'User created successfully' });
      });

      // Act
      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .set('Content-Type', 'application/json');

      // Assert
      expect(response.status).toBe(201);
      expect(mockUserController.create).toHaveBeenCalledTimes(1);
      expect(response.body.message).toBe('User created successfully');
    });
  });

  describe('PUT /api/users/:id', () => {
    it('devrait appeler la méthode update du contrôleur', async () => {
      // Arrange
      const userData = { name: 'Updated User', role: 'admin', age: 35 };
      mockUserController.update.mockImplementation((_req: Request, res: Response) => {
        res.status(200).json({ message: 'User updated successfully' });
      });

      // Act
      const response = await request(app)
        .put('/api/users/1')
        .send(userData)
        .set('Content-Type', 'application/json');

      // Assert
      expect(response.status).toBe(200);
      expect(mockUserController.update).toHaveBeenCalledTimes(1);
      expect(response.body.message).toBe('User updated successfully');
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('devrait appeler la méthode delete du contrôleur', async () => {
      // Arrange
      mockUserController.delete.mockImplementation((_req: Request, res: Response) => {
        res.status(200).json({ message: 'User deleted successfully' });
      });

      // Act
      const response = await request(app).delete('/api/users/1');

      // Assert
      expect(response.status).toBe(200);
      expect(mockUserController.delete).toHaveBeenCalledTimes(1);
      expect(response.body.message).toBe('User deleted successfully');
    });
  });
});