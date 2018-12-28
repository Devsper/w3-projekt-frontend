import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Shift } from '../_models/shift';
import { map } from 'rxjs/operators';

import { Employee } from '../_models/employee';
import { EmployeeService } from '../_services/employee.service';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  shiftToAdd: Shift;
  updateShift: boolean = false;
  authToken = localStorage.employeeToken;
  private serverUrl = "http://localhost/w3-projekt/app";

  constructor(private http: HttpClient,
              private employeeService: EmployeeService) {}

  initShift(){
    this.shiftToAdd = new Shift();
    this.shiftToAdd.employee_Id = localStorage.employeeId;
    this.updateShift = false;
  }

  getShiftToAdd(){
    return this.shiftToAdd;
  }

  createShift(){
    
    let compensateTimeZone = 2;
    let postUrl = this.serverUrl+"/api/shift.php";
    let postBody:any = this.shiftToAdd;
    postBody.token = localStorage.employeeToken;
    // Stringifying dates removes timezone, so have to compensate
    postBody.startTime.setHours(postBody.startTime.getHours()+compensateTimeZone);
    postBody.endTime.setHours(postBody.endTime.getHours()+compensateTimeZone);

    return this.http.post(postUrl, JSON.stringify(postBody), {
      headers: new HttpHeaders({"Content-Type": "application/json"}),
      observe: "response"
      }).pipe(map((data: any) => data.body));
  }

  fetchShiftsByDate(dateToFetch){

    let getUrl = this.serverUrl+"/api/shift.php";
    let authToken = localStorage.employeeToken;
    let employee_Id = localStorage.employeeId;

    return this.http.get(getUrl, { 
      observe: "response",
      params: {token: authToken, date: dateToFetch, employee_Id: employee_Id }
      }).pipe(
        map((res:any) => {
          
          let data = res.body.data;
          let shifts: Shift[] = [];
          
            data.forEach((element: Shift) => {

              let shift = new Shift(element.id, element.startTime, element.endTime, element.taskName);
              shifts.push(shift);
            });

          return shifts;
        }));
  }

  isShiftCreationActive(){
  
    if(typeof this.shiftToAdd.taskName !== "undefined"){      
      return true;
    }else{
      return false;
    }
  }

  isShiftBeingUpdated(){
    return this.updateShift;
  }

  resetShift(){
    delete this.shiftToAdd;
  }

  fetchHours(){

    let calcUrl = this.serverUrl+"/calculate_hours.php";

    return this.http.get(calcUrl, { 
      observe: "response",
      params: {token: this.authToken, date: '2018-12'}
      }).pipe(
        map((res: any) => {

          let employeeData = res.body;
          let employees: Employee[] = [];

          // Creates employee model from fetched data
          employeeData.forEach(employee =>{
    
            let currentEmployee = new Employee(employee.username, null, employee.name);
            currentEmployee.totalHours = employee.totalHours;

            // Adds shift to employee model
            employee.shifts.forEach(shift => {
              currentEmployee.shifts.push(new Shift(null, shift.startTime, shift.endTime, shift.taskName));  
            });

            employees.push(currentEmployee);
          });

          return employees;
        }));
  }
}
