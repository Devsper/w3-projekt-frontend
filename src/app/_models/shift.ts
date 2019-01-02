export class Shift {

    id?: number;
    startTime?: Date;
    endTime?: Date;
    employee_Id?: number;
    taskName?: string;
    relationship_Id?: number;
    shiftType?: string;
    shiftHours: number;

    constructor(id?: number, startTime?: Date, endTime?: Date, taskName?: string, shiftHours?: number){
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.taskName = taskName;
        this.shiftHours = shiftHours;
    }

}
