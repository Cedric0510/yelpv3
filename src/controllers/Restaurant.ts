import { Request, Response } from "express";
import RestaurantService from "../services/Restaurant.js";

class RestaurantController {
    restaurantService: RestaurantService;

    constructor() {
        this.restaurantService = new RestaurantService();
    }

    public async getAll(req: Request, res: Response) {
        try {
            const restaurants = await this.restaurantService.getAll(req, res);
            res.status(200).json(restaurants);
        } catch (e) {
            console.error("Error in controller:", e);
            res.status(500).json({ error: `${e as Error}.message` });
        }
    }

    public async getById(req: Request, res: Response) {
        try {
            const restaurant = await this.restaurantService.getById(req, res);
            res.status(200).json(restaurant);
        } catch (e) {
            console.error("Error in controller:", e);
            res.status(500).json({ error: `${e as Error}.message` });
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const restaurant = await this.restaurantService.create(req, res);
            res.status(201).json(restaurant);
        } catch (e) {
            console.error("Error in controller:", e);
            res.status(500).json({ error: `${e as Error}.message` });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const restaurant = await this.restaurantService.update(req, res);
            res.status(200).json(restaurant);
        } catch (e) {
            console.error("Error in controller:", e);
            res.status(500).json({ error: `${e as Error}.message` });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const restaurant = await this.restaurantService.delete(req, res);
            res.status(200).json(restaurant);
        } catch (e) {
            console.error("Error in controller:", e);
            res.status(500).json({ error: `${e as Error}.message` });
        }
    }
}

export default RestaurantController;