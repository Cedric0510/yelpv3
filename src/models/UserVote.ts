export class UserVote {
    private id?: number;
    private userId: number;
    private restaurantId: number;
    private count: number;  
  
    constructor(userId: number, restaurantId: number, count: number) {
        this.userId = userId;
        this.restaurantId = restaurantId;
        this.count = count;
    }
  
    getVoteId(): number | undefined {
        return this.id;
    }

    getUserId(): number {
        return this.userId;
    }

    getRestaurantId(): number {
        return this.restaurantId;
    }

    getVoteCount(): number {
        return this.count;
    }
  
    setVoteCount(voteValue: number): void {
        this.count = voteValue;
    }
}  