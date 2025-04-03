class Restaurant {
    private id: number;
    private name: string;
    private address: string;
    private type: string;

    constructor(id: number = 0, name: string, address: string, type: string) {
        // Id auto-increment
        this.id = id++;
        this.name = name;
        this.address = address;
        this.type = type;
    }

    public insertRestaurant(r: this) {
        this.name = r.name;
        this.address = r.address;
        this.type = r.type;
    }

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }

    public getAddress() {
        return this.address;
    }

    public getType() {
        return this.type;
    }

    public setId(id: number) {
        this.id = id;
    }

    public setName(name: string) {
        this.name = name;
    }

    public setAddress(address: string) {
        this.address = address;
    }

    public setType(type: string) {
        this.type = type;
    }
}

export default Restaurant;