import { Router } from "express";
import RestaurantController from "../controllers/Restaurant.js";

const restaurantRoutes = Router();
const restaurantController = new RestaurantController();

restaurantRoutes.get("/", (req, res) => restaurantController.getAll(req, res));
restaurantRoutes.get("/:id", (req, res) => restaurantController.getById(req, res));
restaurantRoutes.post("/", (req, res) => restaurantController.create(req, res));
restaurantRoutes.put("/", (req, res) => restaurantController.update(req, res));
restaurantRoutes.delete("/", (req, res) => restaurantController.delete(req, res));

export default restaurantRoutes;