import { Router } from "express";
import userVoteRoutes from './uservote.js';

const router = Router();

// router.use("/users", userRoutes);
router.use("/votes", userVoteRoutes);

export default router;