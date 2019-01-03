/** Class representing a shift */
export class Shift {

    id?: number;
    startTime?: Date;
    endTime?: Date;
    employee_Id?: number;
    taskName?: string;
    relationship_Id?: number;
    shiftType?: string;
    shiftHours: number;

    /**
     * Creates a shift
     * 
     * @param {number} id - Shift id
     * @param {Date} startTime - The date and time shift starts
     * @param {Date} endTime - The date and time shift ends
     * @param {string} taskName - The task for the shift
     * @param {number} shiftHours - A decimal value in hours of shift length
     */
    constructor(id?: number, startTime?: Date, endTime?: Date, taskName?: string, shiftHours?: number){
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.taskName = taskName;
        this.shiftHours = shiftHours;
    }

}
