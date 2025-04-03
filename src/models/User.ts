export class User {
  id: string;
  name: string;
  role : string;
  age : number;  

  constructor(id: string, name: string, imageUrl: string, isBusiness: boolean, role: string, age: number) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.age = age;
    
  }

  getId(): string {
    return this.id;
  }
  setId(id: string): void {
    this.id = id;
  }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getRole(): string {
        return this.role;
    }
    setRole(role: string): void {
        this.role = role;
    }
    getAge(): number {
        return this.age;
    }   
    setAge(age: number): void {
        this.age = age;
    }
}  