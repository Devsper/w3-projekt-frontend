export class Shift {

    id?: number;
    startTime?: Date;
    endTime?: Date;
    employee_Id: number = +localStorage.employeeId;
    relationship_Id?: number;
    shiftType?: string;

    // constructor(id?: number, startTime?: Date, endTime?: Date, employee_Id?: number, shiftType?: string){
        
    //     this.id = id;
    //     this.startTime = startTime;
    //     this.endTime = endTime;
    //     this.employee_Id = employee_Id;
    //     this.shiftType = shiftType;
    // }
}
