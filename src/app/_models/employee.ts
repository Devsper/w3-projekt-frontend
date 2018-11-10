export class Employee {

    public username: string;
    public id: number;
    public name: string;
    public admin: string;
    public hasBeenUpdated: boolean;

    constructor(username: string, id: number, name: string, admin: string){
        this.username = username;
        this.id = id;
        this.name = name;
        this.admin = admin;
        this.hasBeenUpdated = false;
    }
}