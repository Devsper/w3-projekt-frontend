import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';

import { Assignment } from '../_models/assignment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  authToken = localStorage.employeeToken;
  private serverUrl = 'http://localhost/w3-projekt/app';

  constructor(private http: HttpClient){}

  /**
   * Fetches associated assignment for current employee from server
   *
   * @returns {Observable<Assigment[]} - Array of assignments for current employee
   * @memberof AssignmentService
   */
  fetchEmployeeAssignments(): Observable<Assignment[]>{

    let getDataUrl = this.serverUrl+"/get_data.php";
    // Values to send to server
    let postBody = {
      "getData": "employeeAssignments", // Value to trigger correct server method
      "token": this.authToken,
      "employee_Id": localStorage.employeeId
    }

    // Connects to API through POST
    return this.http.post(getDataUrl, postBody ,{
      observe: "response",
      headers: new HttpHeaders({"Content-Type": "application/json"}), 
      })
        .pipe(
          map((res: any) =>{
            
            let data = res.body.data;
            let assignments: Assignment[] = [];
            
            // Creates assignments from fetched data
            data.forEach((element) => {
              // hasTasks translates a string value to a boolean
              assignments.push(new Assignment(element.name, element.id, [], (element.hasTasks === "True")));
            });

            return assignments;
          })
        );
  }

  /**
   * Fetches all assignment and tasks for current employee 
   *
   * @returns {Observable<Assigment[]} - Array of assignments and tasks for current employee
   * @memberof AssignmentService
   */
  fetchEmployeeAssignmentTasks(): Observable<Assignment[]>{
    
    let getDataUrl = this.serverUrl+"/get_data.php";
    // Values to send to server
    let postBody = {
      "getData": "employeeAssignmentTasks", // Value to trigger correct server method
      "token": this.authToken,
      "employee_Id": localStorage.employeeId
    }

    // Connects to API through POST
    return this.http.post<Assignment[]>(getDataUrl, postBody ,{
      observe: "response",
      headers: new HttpHeaders({"Content-Type": "application/json"}), 
      })
        .pipe(
          map((res: any) =>  res.body)
        );
  }

  /**
   * Fetches all available assignments from server
   *
   * @returns {Observable<Assigment[]} - Array of all available assignments
   * @memberof AssignmentService
   */
  fetchAllAssignments(): Observable<Assignment[]>{
    
    let getDataUrl = this.serverUrl+"/api/assignment.php";

    // Connects to API through GET
    return this.http.get(getDataUrl, {
      observe: "response",
      params: {token: this.authToken},
      headers: new HttpHeaders({"Content-Type": "application/json"}), 
      })
        .pipe(
          map((res: any) =>{
            
            let data = res.body.data;
            let assignments: Assignment[] = [];
            
            // Creates assignments from fetched data
            data.forEach((element) => {
              // hasTasks translates a string value to a boolean
              let assignment = new Assignment(element.name, element.id, [], (element.hasTasks === "True"));
              assignments.push(assignment);

            });

            return assignments;
          })
        );
  }

  /**
   * Updates assignments for current employee
   *
   * @param {number[]} assignmentIds - Array of id number to add to database
   * @returns {Observable<boolean>} - Returns status value of true/false
   * @memberof AssignmentService
   */
  updateAssignments(assignmentIds: number[]): Observable<boolean>{

    let postUrl = this.serverUrl+"/handle_relationships.php";
    // Values to send to server
    let postBody = {
      "token": this.authToken,
      "employee_Id": +localStorage.employeeId,
      "relationship": "assignments", // Which relationship table to use
      "assignmentIds": assignmentIds
    }

    // Connects to API through POST
    return this.http.post(postUrl, postBody ,{
      observe: "response",
      headers: new HttpHeaders({"Content-Type": "application/json"}), 
      }).pipe(map((res: any) => res.body.status));
  }
}
