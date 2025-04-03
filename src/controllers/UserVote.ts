import { Request, Response } from "express";
import UserVoteService from '../services/UserVote.js';

class UserVoteController {
    userVoteService: UserVoteService;

    constructor() {
        this.userVoteService = new UserVoteService();
    }

    public async getAll(req: Request, res: Response) {
        try {
            const votes = await this.userVoteService.getAll(req, res);
            res.status(200).json(votes);
        } catch (e) {
            console.error("Error in controller:", e);
            res.status(500).json({ error: `${e as Error}.message` });
        }
    }

    public async getById(req: Request, res: Response) {
        try {
            const vote = await this.userVoteService.getById(req, res);
            res.status(200).json(vote);
        } catch (e) {
            console.error("Error in controller:", e);
            res.status(500).json({ error: `${e as Error}.message` });
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const vote = await this.userVoteService.create(req, res);
            res.status(201).json(vote);
        } catch (e) {
            console.error("Error in controller:", e);
            res.status(500).json({ error: `${e as Error}.message` });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const vote = await this.userVoteService.update(req, res);
            res.status(200).json(vote);
        } catch (e) {
            console.error("Error in controller:", e);
            res.status(500).json({ error: `${e as Error}.message` });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const vote = await this.userVoteService.delete(req, res);
            res.status(200).json(vote);
        } catch (e) {
            console.error("Error in controller:", e);
            res.status(500).json({ error: `${e as Error}.message` });
        }
    }
}

export default UserVoteController;