export class User {
  id: number;
  name: string;
  role : string;
  age : number;  

  constructor(id: number, name: string, imageUrl: string, isBusiness: boolean, role: string, age: number) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.age = age;
    
  }

  getId(): number{
    return this.id;
  }
  setId(id: number): void {
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
export default User;