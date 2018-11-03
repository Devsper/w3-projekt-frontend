import { Task } from '../_models/task';

export class Assignment {

    public id?: number;
    public name: string;
    public hasTasks?: boolean;
    public tasks: Task[];

    constructor(name: string, id?: number, tasks?: Task[], hasTasks?: boolean){
        this.id = id;
        this.name = name;
        this.tasks = tasks;
        this.hasTasks = hasTasks;
    }
}
