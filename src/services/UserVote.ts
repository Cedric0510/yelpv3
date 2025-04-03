import { Request, Response } from "express";
import { UserVote } from '../models/UserVote.js';
import UserVoteRepository from '../repositories/UserVote.js';

class UserVoteService {

    private userVoteRepository: UserVoteRepository;

    constructor() {
        this.userVoteRepository = new UserVoteRepository();
    }

    public async getAll(req: Request, res: Response): Promise<UserVote[]> {
        try {
            const request: UserVote[] = await this.userVoteRepository.getAll();

            if (!Array.isArray(request)) {
                throw new Error("Invalid response from repository.");
            }

            if (request.length === 0) {
                throw new Error("No votes found.");
            }

            for(let i = 0; i < request.length; i++) {
                if (!(request[i] instanceof UserVote)) {
                    throw new Error("Invalid vote object.");
                }
            }

            return await this.userVoteRepository.getAll();
        } catch(e) {
            throw new Error("Failed to fetch votes." + `${e as Error}.message)`);
        }
    }

    public async getById(req: Request, res: Response) {
        try {
            const id: number = parseInt(req.params.id, 10);

            if (!id) {
                throw new Error("Invalid ID provided.");
            }

            const request: UserVote | null = await this.userVoteRepository.getById(id);

            if (!request) {
                throw new Error("Vote not found.");
            }

            if (!(request instanceof UserVote)) {
                throw new Error("Invalid response from repository.");
            }

            return request;
        } catch(e) {
            throw new Error("Failed to fetch vote by ID." + `${e as Error}.message)`);
        }
    }

    public async getByUser(req: Request, res: Response) {
        try {
            const userId: number = parseInt(req.body.userId, 10);

            if (!userId) {
                throw new Error("Invalid ID provided.");
            }

            const request: UserVote[] | null = await this.userVoteRepository.getAllByUser(userId);

            if (!request) {
                throw new Error("Votes not found.");
            }

            if (!(request instanceof UserVote)) {
                throw new Error("Invalid response from repository.");
            }

            return request;
        } catch(e) {
            throw new Error("Failed to fetch vote by ID." + `${e as Error}.message)`);
        }
    }

    public async getByRestaurant(req: Request, res: Response) {
        try {
            const restaurantId: number = parseInt(req.body.restaurantId, 10);

            if (!restaurantId) {
                throw new Error("Invalid ID provided.");
            }

            const request: UserVote[] | null = await this.userVoteRepository.getAllByRestaurant(restaurantId);

            if (!request) {
                throw new Error("Votes not found.");
            }

            if (!(request instanceof UserVote)) {
                throw new Error("Invalid response from repository.");
            }

            return request;
        } catch(e) {
            throw new Error("Failed to fetch vote by ID." + `${e as Error}.message)`);
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const newUserVote: UserVote = new UserVote(req.body.userId, req.body.restaurantId, req.body.voteCount);

            const request: boolean = await this.userVoteRepository.create(newUserVote);

            if (!request) {
                throw new Error("Failed to create vote.");
            }

            return "Vote created successfully.";
        } catch(e) {
            throw new Error("Failed to create vote." + `${e as Error}.message)`);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const id: number = parseInt(req.params.id, 10);

            const request: boolean = await this.userVoteRepository.update(req.body.id, req.body.value, req.body.userId);

            if (!request) {
                throw new Error("Failed to update vote.");
            }

            return "Vote updated successfully.";
        } catch(e) {
            throw new Error("Failed to update vote." + `${e as Error}.message)`);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            // const id: number = parseInt(req.params.id, 10);

            // if (!id) {
            //     throw new Error("Invalid ID provided.");
            // }

            const request: boolean = await this.userVoteRepository.delete(req.body.userId, req.body.restaurantId);

            if (!request) {
                throw new Error("Failed to delete vote.");
            }

            return "Vote deleted successfully.";
        } catch(e) {
            throw new Error("Failed to delete vote." + `${e as Error}.message)`);
        }
    }
}

export default UserVoteService;