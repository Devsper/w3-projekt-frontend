export class Shift {

    id?: number;
    startTime?: Date;
    endTime?: Date;
    employee_Id?: number;
    taskName?: string;
    relationship_Id?: number;
    shiftType?: string;

    constructor(id?: number, startTime?: Date, endTime?: Date, taskName?: string){
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.taskName = taskName;
    }

}
