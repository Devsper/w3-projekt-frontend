import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Employee } from '../_models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeeLoggedIn = localStorage.employeeLoggedIn || false;
  currentEmployee: Employee;
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

              this.employeeLoggedIn = true;
              localStorage.employeeLoggedIn = true;
              localStorage.employeeId = employee.id;
              localStorage.employeeToken = body.token;
              
              this.currentEmployee = new Employee(employee.username, employee.id, employee.name, employee.admin, body.startpage);

              console.log(this.currentEmployee);
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
          
          console.log(data);

          this.employeeLoggedIn = false;
          localStorage.removeItem("employeeLoggedIn");
          localStorage.removeItem("employeeToken");
          delete this.currentEmployee;
          this.router.navigate(['/'])
        
        }));
  }
  
  checkLoginStatus(){
    
    if(localStorage.employeeLoggedIn){
      return true;
    }else{
      return false;
    }
  }

  getCurrentEmployee(){
    
    let employeeUrl = this.serverUrl+"/api/employee.php";
    let currentId = localStorage.employeeId;
    let authToken = localStorage.employeeToken;
    
    return this.http.get(employeeUrl, { 
      observe: "response",
      params: {id: currentId, token: authToken }
      }).pipe(
        map((data: any) => {

          let body = data.body[0]; 

          this.currentEmployee = new Employee(body.username, body.id, body.name, body.admin, body.startpage);
          return this.currentEmployee;
        }));
    
  }

  getCurrentEmployeeId(){
    return localStorage.employeeId;
  }
}
