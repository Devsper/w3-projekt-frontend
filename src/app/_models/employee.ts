import { Shift } from '../_models/shift';

export class Employee {

    public username?: string;
    public id?: number;
    public name?: string;
    public isAdmin?: string;
    public password?: string;
    public employeeNr?: string;
    public totalHours?: number;
    public shifts?: Shift[];

    constructor(username?: string, id?: number, name?: string, isAdmin?: string, employeeNr?: string, password?: string){
        this.username = username;
        this.id = id;
        this.name = name;
        this.isAdmin = isAdmin;
        this.employeeNr = employeeNr;
        this.password = password;
        this.shifts = [];
    }
}