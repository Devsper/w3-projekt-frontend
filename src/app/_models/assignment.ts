import { Task } from '../_models/task';

export class Assignment {

    public id?: number;
    public name: string;
    public hasTasks: boolean;

    constructor(name: string, hasTasks: boolean, id?: number){
        this.id = id;
        this.name = name;
        this.hasTasks = hasTasks;
    }
}
