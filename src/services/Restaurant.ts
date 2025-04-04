import { Request, Response } from "express";
import Restaurant from "../models/Restaurant.js";
import RestaurantRepository from "../repositories/Restaurant.js";
import UserVoteRepository from "../repositories/UserVote.js";

class RestaurantService {

    private restaurantRepository: RestaurantRepository;
    private userVoteRepository: UserVoteRepository;

    constructor() {
        this.restaurantRepository = new RestaurantRepository();
        this.userVoteRepository = new UserVoteRepository();
    }

    public async getAll(req: Request, res: Response): Promise<Restaurant[]> {
        try {
            const request: Restaurant[] = await this.restaurantRepository.getAll();

            if (!Array.isArray(request)) {
                throw new Error("Invalid response from repository.");
            }

            if (request.length === 0) {
                throw new Error("No restaurants found.");
            }

            for(let i = 0; i < request.length; i++) {
                if (!(request[i] instanceof Restaurant)) {
                    throw new Error("Invalid restaurant object.");
                }
            }

            return await this.restaurantRepository.getAll();
        } catch(e) {
            throw new Error("Failed to fetch restaurants." + `${e as Error}.message)`);
        }
    }

    public async getById(req: Request, res: Response) {
        try {
            const id: number = parseInt(req.params.id, 10);

            if (!id) {
                throw new Error("Invalid ID provided.");
            }

            const request: Restaurant|undefined = await this.restaurantRepository.getById(id);

            if (!request) {
                throw new Error("Restaurant not found.");
            }

            if (!(request instanceof Restaurant)) {
                throw new Error("Invalid response from repository.");
            }

            return request;
        } catch(e) {
            throw new Error("Failed to fetch restaurant by ID." + `${e as Error}.message)`);
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const body: Restaurant = req.body;
            const newRestaurant: Restaurant = new Restaurant(undefined, body.getName(), body.getAddress(), body.getType());

            const request: boolean = await this.restaurantRepository.create(newRestaurant);

            if (!request) {
                throw new Error("Failed to create restaurant.");
            }

            return "Restaurant created successfully.";
        } catch(e) {
            throw new Error("Failed to create restaurant." + `${e as Error}.message)`);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const id: number = parseInt(req.params.id, 10);
            const body: Restaurant = req.body;
            const updatedRestaurant = new Restaurant(id, body.getName(), body.getAddress(), body.getType());

            const request: boolean = await this.restaurantRepository.update(updatedRestaurant);

            if (!request) {
                throw new Error("Failed to update restaurant.");
            }

            return "Restaurant updated successfully.";
        } catch(e) {
            throw new Error("Failed to update restaurant." + `${e as Error}.message)`);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const id: number = parseInt(req.params.id, 10);

            if (!id) {
                throw new Error("Invalid ID provided.");
            }

            const request: boolean = await this.restaurantRepository.delete(id);

            if (!request) {
                throw new Error("Failed to delete restaurant.");
            }

            return "Restaurant deleted successfully.";
        } catch(e) {
            throw new Error("Failed to delete restaurant." + `${e as Error}.message)`);
        }
    }

    public async calculatedAverageVote(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);

            if (!id) {
                throw new Error("Invalid ID provided.");
            }

            const request = await this.userVoteRepository.getAllByRestaurant(id);

            if (!request) {
                throw new Error("Restaurant not found.");
            }

            let totalLength = request.length;
            let sumVotes = 0;

            for(let i = 0; i < request.length; i++) {
                sumVotes += request[i].getVoteCount();
            }

            const averageVote = sumVotes / totalLength;
            return averageVote;
        } catch(e) {
            throw new Error("Failed to calculate average vote." + `${e as Error}.message)`);
        }
    }
}

export default RestaurantService;