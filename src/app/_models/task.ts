import { Subtask } from '../_models/subtask';

export class Task {

    id?: number;
    name: string;
    subtasks?: Subtask[];

    constructor(name?: string, id?: number){
        this.id = id;
        this.name = name;
    }
}