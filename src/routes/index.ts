import { Router } from "express";
import restaurantRoutes from "./restaurant.js";

const router = Router();

router.use("/restaurants", restaurantRoutes);

export default router;