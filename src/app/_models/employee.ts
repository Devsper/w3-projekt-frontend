import { Shift } from '../_models/shift';

/** Class representing an Employee */
export class Employee {

    public username?: string;
    public id?: number;
    public name?: string;
    public isAdmin?: string;
    public password?: string;
    public employeeNr?: string;
    public totalHours?: number;
    public shifts?: Shift[];

    /**
     * Creates an employee
     * 
     * @param {string} username - Username associated with employee
     * @param {number} id - Empoyee id
     * @param {string} name - Name of employee
     * @param {string} isAdmin - Y/N value if employee is an administrator
     * @param {string} employeeNr - Employee number associated with employee
     * @param {string} password - Employee password
     */ 
    constructor(username?: string, id?: number, name?: string, isAdmin?: string, employeeNr?: string, password?: string){
        this.username = username;
        this.id = id;
        this.name = name;
        this.isAdmin = isAdmin;
        this.employeeNr = employeeNr;
        this.password = password;
        this.shifts = []; // Always initiate an empty array of shifts
    }
}