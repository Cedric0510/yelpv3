import { Router } from "express";
import UserVoteController from '../controllers/UserVote.js';

const userVoteRoutes = Router();
const userVoteController = new UserVoteController();

userVoteRoutes.get("/", (req, res) => userVoteController.getAll(req, res));
userVoteRoutes.get("/:id", (req, res) => userVoteController.getById(req, res));
userVoteRoutes.post("/", (req, res) => userVoteController.create(req, res));
userVoteRoutes.put("/", (req, res) => userVoteController.update(req, res));
userVoteRoutes.delete("/", (req, res) => userVoteController.delete(req, res));

export default userVoteRoutes;