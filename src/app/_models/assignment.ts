import { Task } from '../_models/task';

/** Class representing an Assignment */
export class Assignment {

    public id?: number;
    public name: string;
    public hasTasks?: boolean;
    public tasks: Task[];

    /**
     * Creates an assignment
     * 
     * @param {string} name - Name of assignment
     * @param {number} id - Assignment id
     * @param {Task[]} tasks - Tasks that belongs to assignment
     * @param {boolean} hasTasks - Value if assignment has associated tasks
     */
    constructor(name: string, id?: number, tasks?: Task[], hasTasks?: boolean){
        this.id = id;
        this.name = name;
        this.tasks = tasks;
        this.hasTasks = hasTasks;
    }
}
