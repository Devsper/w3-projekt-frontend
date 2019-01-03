import { Subtask } from '../_models/subtask';

/** Class representing a task */
export class Task {

    id?: number;
    name: string;
    subtasks?: Subtask[];

    /**
     * Creates a task
     * 
     * @param {string} name - Task name
     * @param {number} id - Task id
     */
    constructor(name?: string, id?: number){
        this.id = id;
        this.name = name;
        this.subtasks = [];
    }
}