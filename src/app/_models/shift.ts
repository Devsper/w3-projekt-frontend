export class Shift {

    id?: number;
    startTime?: Date;
    endTime?: Date;
    employee_Id: number = +localStorage.employeeId;
    task?: string;
    relationship_Id?: number;
    shiftType?: string;

}
