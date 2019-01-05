import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Employee } from '../_models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // Subject can be subscribed to and fire code when changes occur
  subject = new Subject<boolean>(); 
  currentEmployee: Employee;
  // Checks if employee is logged in
  employeeLoggedIn = localStorage.employeeLoggedIn || false;
  authToken = localStorage.employeeToken;
  private serverUrl = "http://devsper.com/app";

  constructor(private http: HttpClient,
              private router: Router) {}
  
  /**
   * Login employee to application
   * @param {string} username - Inputted username
   * @param {string} password - Inputted password
   * @returns {Observable<boolean>} - Status of success
   * @memberof EmployeeService
   */
  login(username: string, password: string): Observable<boolean>{

    let loginUrl = this.serverUrl+"/login.php";
    // Creates object to send
    let credentials = { "user": username, "pass": password};

    return this.http.post(loginUrl, credentials, {
      headers: new HttpHeaders({"Content-Type": "application/json"}),
      observe: "response"
      }).pipe(
        map((data: any) => {
            
            let body = data.body;
            let employee = data.body.employee;

            // If login was successful
            if(body.message == true){

              // Add variables to localStorage
              localStorage.employeeToken = body.token;
              localStorage.employeeLoggedIn = true;
              localStorage.employeeUsername = employee.username;
              localStorage.employeeId = employee.id;
              localStorage.employeeName = employee.name;
              localStorage.employeeAdmin = employee.isAdmin;
              this.currentEmployee = new Employee(employee.username, employee.id, employee.name, employee.isAdmin);

              // Change value of subject that other components are subscribed to
              this.subject.next(true);

              return true;
            }

            return false;
      }));
  }

  /**
   * Logout employee from application
   * @returns {Observable<void>}
   * @memberof EmployeeService
   */
  logout(): Observable<void>{

    let logoutUrl = this.serverUrl+"/logout.php";
  
    return this.http.get(logoutUrl, { 
      observe: "response",
      params: {logout: "true"}
      }).pipe(
        map(() => {

          // Resets application values
          this.subject.next(false);
          localStorage.clear();
          delete this.currentEmployee;
          this.router.navigate(['/']);
          
        }));
  }
  
  /**
   * Fetches logged in status for employee
   * @returns {boolean} - Login status
   * @memberof EmployeeService
   */
  isLoggedIn(): boolean{
      return localStorage.employeeLoggedIn;
  }

  /**
   * Fetches a subject to listen to for change in login status
   * @returns {Observable<boolean>} - Subscribable subject
   * @memberof EmployeeService
   */
  listenToLoginStatus(): Observable<boolean> {
    return this.subject.asObservable();
  }

  /**
   * Fetches logged in employee
   * @returns {Employee} - Currently logged in employee
   * @memberof EmployeeService
   */
  getCurrentEmployee(): Employee{

    // Return employee from application
    if(typeof this.currentEmployee !== 'undefined') {
      return this.currentEmployee;
    }else{
      
      // Return employee from localstorage
      return this.currentEmployee = new Employee(
        localStorage.employeeUsername, 
        localStorage.employeeId, 
        localStorage.employeeName, 
        localStorage.employeeAdmin, 
        );

    }
  }

  /**
   * Fetches all employees from server
   * @returns {Observable<Employee[]>} - An array of all employees
   * @memberof EmployeeService
   */
  fetchAllEmployees(): Observable<Employee[]>{

    let employeeUrl = this.serverUrl+"/api/employee.php";

    // Connects to API through GET
    return this.http.get(employeeUrl, { 
      observe: "response",
      params: {token: this.authToken},
    }).pipe(
      map((res: any) => {

        let employees: Employee[] = [];
        let data: any = Array.from(res.body);

        // Creates employees from fetched data
        data.forEach(employee => {
          employees.push(new Employee(employee.username, employee.id, employee.name, employee.isAdmin, employee.employeeNr));
        });

        return employees;
      }));;
  }

  /**
   * Fetches a single employee from the server
   * @param {string} employeeId - Id of employee
   * @returns {Observable<Employee>} - Fetched employee
   * @memberof EmployeeService
   */
  fetchSingleEmployee(employeeId: string): Observable<Employee>{

    let employeeUrl = this.serverUrl+"/api/employee.php";
    let authToken = localStorage.employeeToken;
    
    // Connects to API through GET
    return this.http.get(employeeUrl, { 
      observe: "response",
      params: {id: employeeId, token: authToken }
      }).pipe(
        map((res: any) => {

          let body = res.body[0]; 

          // Returns employee
          return new Employee(body.username, body.id, body.name, body.isAdmin, body.employeeNr, body.password);
        }));
  }

  /**
   * Connects to API and updates employee
   * @param {Employee} employee - Employee to update
   * @returns {Observable<boolean>} - Success status of API call
   * @memberof EmployeeService
   */
  editEmployee(employee: Employee):Observable<boolean>{

    let apiUrl = this.serverUrl+"/api/employee.php";
    // Data to send to server
    let payload = {
      token: this.authToken,
      id: employee.id,
      name: employee.name,
      username: employee.username,
      password: employee.password,
      employeeNr: employee.employeeNr
    }

    // Connects to API through PUT
    return this.http.put(apiUrl, payload, {
      headers: new HttpHeaders({"Content-Type": "application/json"}),
      observe: "response"
      }).pipe(
        map((res: any) => {
            
            if(res.body.status == 'success'){
              return true;
            }
            
            return false;
      }));
  }

  /**
   * Connects to API to create a new employee
   * 
   * @param {Employee} employee Employee to create 
   * @return {Observable<boolean>} Success status of API call
   */
  createEmployee(employee: Employee): Observable<boolean>{

    let apiUrl = this.serverUrl+"/api/employee.php";
    let payload = {
      token: this.authToken,
      name: employee.name,
      username: employee.username,
      password: employee.password,
      employeeNr: employee.employeeNr
    }

    // Connects to API through POST
    return this.http.post(apiUrl, payload, {
      headers: new HttpHeaders({"Content-Type": "application/json"}),
      observe: "response"
      }).pipe(
        map((res: any) => {
            
            if(res.body.status == 'success'){
              return true;
            }
            
            return false;
            
      }));
  }

  /**
   * Connects to API and deletes employee
   * @param {number} employeeId - id of employee to delete
   * @returns {Observable<boolean>} - Success status of API call
   * @memberof EmployeeService
   */
  deleteEmployee(employeeId: number):Observable<boolean>{
    
    let apiUrl = this.serverUrl+"/api/employee.php";
    // Data to send to server
    let payload = {
      token: this.authToken,
      id: employeeId
    }

    // Connects to API through DELETE
    // http.request needed to send payload
    return this.http.request('delete', apiUrl, {
        headers: new HttpHeaders({"Content-Type": "application/json"}),
        observe: "response",
        body: payload
    }).pipe(
      map((res: any) =>{

        if(res.body.status == 'success'){
          return true;
        }
        
        return false;
      
    }));
  }
}