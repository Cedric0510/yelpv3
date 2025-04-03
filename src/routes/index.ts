import { Router } from "express";
import userVoteRoutes from './uservote.js';
import restaurantRoutes from "./restaurant.js";

const router = Router();

router.use("/votes", userVoteRoutes);
router.use("/restaurants", restaurantRoutes);

export default router;