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
              localStorage.employeeAdmin = employee.admin;
              localStorage.employeeStartpage = body.startpage;
              this.currentEmployee = new Employee(employee.username, employee.id, employee.name, employee.admin, body.startpage);

              this.subject.next(true);

              return body.startpage;
            }
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

  // fetchCurrentEmployee(){
    
  //   let employeeUrl = this.serverUrl+"/api/employee.php";
  //   let currentId = this.fetchFromStorage("id");
  //   let authToken = localStorage.employeeToken;
    
  //   return this.http.get(employeeUrl, { 
  //     observe: "response",
  //     params: {id: currentId, token: authToken }
  //     }).pipe(
  //       map((data: any) => {

  //         let body = data.body[0]; 

  //         this.currentEmployee = new Employee(body.username, body.id, body.name, body.admin, body.startpage);
  //         return this.currentEmployee;
  //       }));
  // }

  getCurrentEmployee(){

    if(typeof this.currentEmployee !== 'undefined') {
      return this.currentEmployee;
    }else{

      return this.currentEmployee = new Employee(
        localStorage.employeeUsername, 
        localStorage.employeeId, 
        localStorage.employeeName, 
        localStorage.employeeAdmin, 
        localStorage.employeeStartpage
        );

    }
  }
}
