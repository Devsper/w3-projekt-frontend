import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs'

import { Task } from '../_models/task';
import { Subtask } from '../_models/subtask';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  authToken = localStorage.employeeToken;
  assignmentId: number;

  constructor(private http: HttpClient) { }

  private serverUrl = 'http://localhost/w3-projekt/app';
  
  /**
   * Connects to API to fetch tasks and subtasks for a specific employee
   * @returns {Observable<Task[]>} - Returns tasks with associated subtasks
   * @memberof TaskService
   */
  fetchTasksSubtasks(): Observable<Task[]>{

    let getDataUrl = this.serverUrl+"/get_data.php";
    let postBody = {
      "getData": "employeeTasksSubtasks",  // Value to trigger correct server method
      "token": this.authToken,
      "employee_Id": localStorage.employeeId,
      "assignment_Id": this.assignmentId
    }

    // Connects to API through POST
    return this.http.post(getDataUrl, postBody ,{
      observe: "response",
      headers: new HttpHeaders({"Content-Type": "application/json"}) 
      }).pipe(
          map((res: any) =>{
            
            let data = res.body.data;
            // Creates an array of all main tasks from fetched object  
            let distinctKeys = new Set(data.map(obj => obj.taskName));
            let tasks: Task[] = [];

            // Creates task from each element
            distinctKeys.forEach(element => {

              let task: Task = {
                "name": <string>element,
                "subtasks": []
              }

              tasks.push(task);
            });

            // Creates subtask from fetched data
            data.forEach(element => {
              
              let subtask: Subtask = { "name": element.subtaskName, "id": element.subtaskId };
              // Finds correct Task array to push subtask to
              let objectToPush: Task = tasks.find(obj => obj.name == element.taskName);

              objectToPush.subtasks.push(subtask);
            });

            return tasks;
          })
        );
  }

  /**
   * Connects to API and fetches all tasks associated with current employee
   * @returns {Observable<Task[]>} - Tasks that are associated with current employee
   * @memberof TaskService
   */
  fetchEmployeeActiveTasks(): Observable<Task[]>{

    let getDataUrl = this.serverUrl+"/get_data.php";
    let postBody = {
      "getData": "employeeActiveTasks",
      "token": this.authToken,
      "employee_Id": localStorage.employeeId
    }

    // Connects to API through POST
    return this.http.post(getDataUrl, postBody ,{
      observe: "response",
      headers: new HttpHeaders({"Content-Type": "application/json"}), 
      }).pipe(
          map((res: any) =>{
  
            let data = res.body.data;
            let tasks: Task[] = [];
            
            // Creates tasks from fetched data
            data.forEach((task) => {

              tasks.push(new Task(task.taskName, task.taskId));
            });

            return tasks;
          })
        );
  }

  /**
   * Connects to API to update active tasks for employee
   * @param {number[]} taskIds - Id of tasks to update
   * @returns {Observable<boolean>} - Success status
   * @memberof TaskService
   */
  updateTasks(taskIds: number[]): Observable<boolean>{
    
    let postUrl = this.serverUrl+"/handle_relationships.php";
    let postBody = {
      "token": this.authToken,
      "employee_Id": +localStorage.employeeId,
      "relationship": "tasks", // Relationship table to execute against
      "taskIds": taskIds
    }

    // Connects to API through POST
    return this.http.post(postUrl, postBody ,{
      observe: "response",
      headers: new HttpHeaders({"Content-Type": "application/json"}), 
      }).pipe(map((res: any) => {

        if(res.body.status == 'success'){
          return true;
        }
        
        return false;
      }));
  }
}
