import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Shift } from '../_models/shift';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Employee } from '../_models/employee';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  currentShift: Shift = new Shift();
  updateShift: boolean = false; // Variable to check if shift is currently being updated
  authToken = localStorage.employeeToken;
  private serverUrl = "http://devsper.com/app";

  constructor(private http: HttpClient) {}

  /**
   * Initialize a shift for creation
   * @memberof ShiftService
   */
  initShift(): void{
    this.currentShift = new Shift();
    this.currentShift.employee_Id = localStorage.employeeId;
    this.updateShift = false;
  }

  /**
   * Fetches the current shift thats being updated or created
   * @returns {Shift} - Returns the current shift
   * @memberof ShiftService
   */
  getShift(): Shift{
    return this.currentShift;
  }

  /**
   * Connects to API and creates a shift
   * @returns {Observable<boolean>} - Success status
   * @memberof ShiftService
   */
  createShift(): Observable<boolean>{
    
    let postUrl = this.serverUrl+"/api/shift.php";
    let postBody:any = this.currentShift; // Data type any to be able to add the auth token
    postBody.token = localStorage.employeeToken;
    // Stringifying dates removes timezone, so have to compensate
    postBody.startTime.setHours(postBody.startTime.getHours() - postBody.startTime.getTimezoneOffset() / 60);
    postBody.endTime.setHours(postBody.endTime.getHours() - postBody.startTime.getTimezoneOffset() / 60);

    // Connects to API through POST
    return this.http.post(postUrl, JSON.stringify(postBody), {
      headers: new HttpHeaders({"Content-Type": "application/json"}),
      observe: "response"
      }).pipe(map((res: any) => {

        if(res.body.status == 'success'){
          return true;
        }
        
        return false;

      }));
  }

  /**
   * Connects to API to fetch all shifts by a specific date
   * @param {string} dateToFetch - Which date to fetch format yyyy-mm
   * @returns {Observable<Shift[]>} - All shifts for given date
   * @memberof ShiftService
   */
  fetchShiftsByDate(dateToFetch: string): Observable<Shift[]>{

    let getUrl = this.serverUrl+"/api/shift.php";
    let authToken = localStorage.employeeToken;
    let employee_Id = localStorage.employeeId;

    // Connects to API through GET
    return this.http.get(getUrl, { 
      observe: "response",
      params: {token: authToken, date: dateToFetch, employee_Id: employee_Id }
      }).pipe(
        map((res:any) => {
          
          let data = res.body.data;
          let shifts: Shift[] = [];
          
            // Creates shifts from fetched data
            data.forEach((element: Shift) => {

              let shift = new Shift(element.id, element.startTime, element.endTime, element.taskName);
              shifts.push(shift);
            });
            
          return shifts;
        }));
  }

  /**
   * Checks if a shift is currently being created 
   * @returns {boolean} - Creation status
   * @memberof ShiftService
   */
  isShiftCreationActive(): boolean{
  
    if(typeof this.currentShift.taskName !== "undefined" || this.currentShift.taskName == ""){      
      return true;
    }else{
      return false;
    }
  }

  /**
   * Checks if shift is being updated
   * @returns {boolean} Update status
   * @memberof ShiftService
   */
  isShiftBeingUpdated(): boolean{
    return this.updateShift;
  }

  /**
   * Resets shift object
   * @memberof ShiftService
   */
  resetShift(): void{
    delete this.currentShift;
    this.currentShift = new Shift();
    this.updateShift = false;
  }

  /**
   * Connects to API and fetches an employee and shifts with a accumulation of total hours 
   * @returns {Observable<Employee[]>} - Returns employees with all shift and hours
   * @memberof ShiftService
   */
  fetchHours(): Observable<Employee[]>{

    let calcUrl = this.serverUrl+"/calculate_hours.php";

    // Connects to API through GET
    return this.http.get(calcUrl, { 
      observe: "response",
      params: {token: this.authToken, date: '2018-12'} // Currently hardcoded
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
              currentEmployee.shifts.push(new Shift(null, shift.startTime, shift.endTime, shift.taskName, shift.shiftHours));  
            });

            employees.push(currentEmployee);
          });

          return employees;
        }));
  }
}
