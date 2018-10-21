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
              
              this.currentEmployee = new Employee(employee.username, employee.id, employee.name);

              return body.startpage;
            }
      }));
  }

  logout(){

    let logoutUrl = this.serverUrl+"/logout.php";

    return this.http.get(logoutUrl, { observe: "response"})
      .pipe(
        map(() => {
          
          this.employeeLoggedIn = false;
          localStorage.removeItem("employeeLoggedIn");
          delete this.currentEmployee;
          this.router.navigate(['/'])
        
        }));

  }
  
  checkLoginStatus(){
    return this.employeeLoggedIn;
  }

  isEmployeeAllowed(){
    if(!this.employeeLoggedIn){
      this.router.navigate(['/']);
    }
  }

  getCurrentEmployee(){
    return this.currentEmployee;
  }
}
