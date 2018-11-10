import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { EmployeeService } from '../_services/employee.service';
import { Assignment } from '../_models/assignment';
import { Observable, forkJoin } from 'rxjs';
import { Task } from '../_models/task';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  authToken = localStorage.employeeToken;

  constructor(private http: HttpClient, 
              private employeeService: EmployeeService){ }

  private serverUrl = 'http://localhost/w3-projekt/app';

  fetchEmployeeAssignments(){

    let getDataUrl = this.serverUrl+"/get_data.php";
    let postBody = {
      "getData": "employeeAssignments",
      "token": this.authToken,
      "employee_Id": localStorage.employeeId
    }

    return this.http.post(getDataUrl, postBody ,{
      observe: "response",
      headers: new HttpHeaders({"Content-Type": "application/json"}), 
      })
        .pipe(
          map((res: any) =>{
            
            let data = res.body.data;
            let assignments: Assignment[] = [];
            
            data.forEach((element) => {

              let assignment = new Assignment(element.name, element.id, [], (element.hasTasks === "True"));
              assignments.push(assignment);
            });

            return assignments;
          })
        );
  }

  fetchEmployeeAssignmentTasks(){
    
    let getDataUrl = this.serverUrl+"/get_data.php";
    let postBody = {
      "getData": "employeeAssignmentTasks",
      "token": this.authToken,
      "employee_Id": localStorage.employeeId
    }

    return this.http.post(getDataUrl, postBody ,{
      observe: "response",
      headers: new HttpHeaders({"Content-Type": "application/json"}), 
      })
        .pipe(
          map((res: any) =>{
            
            let data = res.body;
            let assignments: Assignment[] = data;
            
            return assignments;
          })
        );
    
  }

  fetchAllAssignments(){
    
    let getDataUrl = this.serverUrl+"/api/assignment.php";

    return this.http.get(getDataUrl, {
      observe: "response",
      params: {token: this.authToken},
      headers: new HttpHeaders({"Content-Type": "application/json"}), 
      })
        .pipe(
          map((res: any) =>{
            
            let data = res.body.data;
            let assignments: Assignment[] = [];
             
            data.forEach((element) => {

              let assignment = new Assignment(element.name, element.id, [], (element.hasTasks === "True"));
              assignments.push(assignment);

            });

            return assignments;
          })
        );
  }

  updateAssignments(assignmentIds: number[]){

    let postUrl = this.serverUrl+"/handle_relationships.php";
    let postBody = {
      "token": this.authToken,
      "employee_Id": +localStorage.employeeId,
      "relationship": "assignments",
      "assignmentIds": assignmentIds
    }

    return this.http.post(postUrl, postBody ,{
      observe: "response",
      headers: new HttpHeaders({"Content-Type": "application/json"}), 
      }).pipe(map((res: any) => res.body));
  }
}
