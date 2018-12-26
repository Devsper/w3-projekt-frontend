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

  subject = new Subject<boolean>();
  currentEmployee: Employee;
  employeeLoggedIn = localStorage.employeeLoggedIn || false;
  authToken = localStorage.employeeToken;
  private serverUrl = "http://localhost/w3-projekt/app";

  constructor(private http: HttpClient,
              private router: Router) {}

  login(username: string, password: string){

    let loginUrl = this.serverUrl+"/login.php";
    let credentials = { "user": username, "pass": password};

    return this.http.post(loginUrl, credentials, {
      headers: new HttpHeaders({"Content-Type": "application/json"}),
      observe: "response"
      }).pipe(
        map((data: any) => {
            
            let body = data.body;
            let employee = data.body.employee;

            if(body.message == true){

              localStorage.employeeToken = body.token;
              localStorage.employeeLoggedIn = true;
              localStorage.employeeUsername = employee.username;
              localStorage.employeeId = employee.id;
              localStorage.employeeName = employee.name;
              localStorage.employeeAdmin = employee.isAdmin;
              this.currentEmployee = new Employee(employee.username, employee.id, employee.name, employee.isAdmin);

              this.subject.next(true);

              return true;
            }

            return false;
      }));
  }

  logout(){

    let logoutUrl = this.serverUrl+"/logout.php";
  
    return this.http.get(logoutUrl, { 
      observe: "response",
      params: {logout: "true"}
      }).pipe(
        map((data) => {

          this.subject.next(false);
          localStorage.clear();
          delete this.currentEmployee;
          this.router.navigate(['/']);

        }));
  }
  
  isLoggedIn(){
      return localStorage.employeeLoggedIn;
  }

  listenToLoginStatus(): Observable<any> {
    return this.subject.asObservable();
  }

  getCurrentEmployee(){

    if(typeof this.currentEmployee !== 'undefined') {
      return this.currentEmployee;
    }else{

      return this.currentEmployee = new Employee(
        localStorage.employeeUsername, 
        localStorage.employeeId, 
        localStorage.employeeName, 
        localStorage.employeeAdmin, 
        );

    }
  }

  fetchAllEmployees(){

    let employeeUrl = this.serverUrl+"/api/employee.php";

    return this.http.get(employeeUrl, { 
      observe: "response",
      params: {token: this.authToken},
    }).pipe(
      map((res: any) => {

        let employees: Employee[] = [];
        let data = <any>res.body;

        data.forEach(element => {
          employees.push(new Employee(element.username, element.id, element.name, element.isAdmin));
        });

        return employees;
      }));;
  }

  fetchSingleEmployee(employeeId: string){

    let employeeUrl = this.serverUrl+"/api/employee.php";
    let authToken = localStorage.employeeToken;
    

    return this.http.get(employeeUrl, { 
      observe: "response",
      params: {id: employeeId, token: authToken }
      }).pipe(
        map((res: any) => {

          let body = res.body[0]; 

          return new Employee(body.username, body.id, body.name, body.isAdmin, body.employeeNr, body.password);
        }));
  }

  editEmployee(employee: Employee){

    let apiUrl = this.serverUrl+"/api/employee.php";
    let payload = {
      token: this.authToken,
      id: employee.id,
      name: employee.name,
      username: employee.username,
      password: employee.password,
      employeeNr: employee.employeeNr
    }

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
   * @param {Employee} employee Employee to create 
   * @return {Observable<boolean>} Success status of API call
   */
  createEmployee(employee: Employee){

    let apiUrl = this.serverUrl+"/api/employee.php";
    let payload = {
      token: this.authToken,
      name: employee.name,
      username: employee.username,
      password: employee.password,
      employeeNr: employee.employeeNr
    }

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

  deleteEmployee(employeeId: number){
    
    let apiUrl = this.serverUrl+"/api/employee.php";
    let payload = {
      token: this.authToken,
      id: employeeId
    }

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
