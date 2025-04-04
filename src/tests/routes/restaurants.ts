import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import request from 'supertest';
import express, { Request, Response, Application } from 'express'; // Ajout des types Request et Response
import restaurantRoutes from '../../routes/restaurant.js';

jest.mock('../../controllers/Restaurant.js', () => {
  return jest.fn().mockImplementation(() => ({
    getAll: jest.fn((_req: Request, res: Response) => res.status(200).json([])),
    getById: jest.fn((_req: Request, res: Response) => res.status(200).json({})),
    create: jest.fn((_req: Request, res: Response) => res.status(201).json({ message: 'Created' })),
    update: jest.fn((_req: Request, res: Response) => res.status(200).json({ message: 'Updated' })),
    delete: jest.fn((_req: Request, res: Response) => res.status(200).json({ message: 'Deleted' }))
  }));
});

describe('Restaurant Routes', () => {
  let app: Application; 

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/restaurants', restaurantRoutes);
    
    jest.clearAllMocks();
  });

  describe('GET /restaurants', () => {
    it('devrait renvoyer la liste des restaurants', async () => {
      const response = await request(app).get('/restaurants');
      expect(response.status).toBe(200);
    });
  });

  // Ajoutez les autres tests (GET /:id, POST, PUT, DELETE) comme pour les routes User
});