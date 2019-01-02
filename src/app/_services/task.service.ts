import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { EmployeeService } from '../_services/employee.service';

import { Task } from '../_models/task';
import { Subtask } from '../_models/subtask';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  authToken = localStorage.employeeToken;
  assignmentId: number;

  constructor(private http: HttpClient,
              private employeeService: EmployeeService) { }

  private serverUrl = 'http://localhost/w3-projekt/app';
  
  fetchTasksSubtasks(){

    let getDataUrl = this.serverUrl+"/get_data.php";
    let postBody = {
      "getData": "employeeTasksSubtasks",
      "token": this.authToken,
      "employee_Id": localStorage.employeeId,
      "assignment_Id": this.assignmentId
    }

    return this.http.post(getDataUrl, postBody ,{
      
      observe: "response",
      headers: new HttpHeaders({"Content-Type": "application/json"}) 
      })
              .pipe(
                map((res: any) =>{
                  
                  let data = res.body.data;
                  let distinctKeys = new Set(data.map(obj => obj.taskName));
                  let tasks: Task[] = [];

                  distinctKeys.forEach(element => {

                    let task: Task = {
                      "name": <string>element,
                      "subtasks": []
                    }

                    tasks.push(task);
                  });

                  data.forEach(element => {
                    
                    // Creates subtask from fetched data
                    let subtask: Subtask = { "name": element.subtaskName, "id": element.subtaskId };
                    // Finds correct array to push subtask to
                    let objectToPush: Task = tasks.find(obj => obj.name == element.taskName);

                    objectToPush.subtasks.push(subtask);
                  });

                  return tasks;
                })
              );
  }

  fetchEmployeeActiveTasks(){

    let getDataUrl = this.serverUrl+"/get_data.php";
    let postBody = {
      "getData": "employeeActiveTasks",
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
            let tasks: Task[] = [];
            
            data.forEach((element) => {

              let task = new Task(element.taskName, element.taskId);
              tasks.push(task);

            });

            return tasks;
          })
        );
  }

  fetchAllTasks(){
    
    let getDataUrl = this.serverUrl+"/api/task.php";

    return this.http.get(getDataUrl, {
      observe: "response",
      params: {token: this.authToken},
      headers: new HttpHeaders({"Content-Type": "application/json"}), 
      })
        .pipe(
          map((res: any) =>{
            
            let data = res.body.data;
            let tasks: Task[] = [];
            
            data.forEach((element) => {

              let assignment = new Task(element.name , element.id);
              tasks.push(assignment);
            });

            return tasks;
          })
        );
  }

  updateTasks(taskIds: number[]){
    
    let postUrl = this.serverUrl+"/handle_relationships.php";
    let postBody = {
      "token": this.authToken,
      "employee_Id": +localStorage.employeeId,
      "relationship": "tasks",
      "taskIds": taskIds
    }

    return this.http.post(postUrl, postBody ,{
      observe: "response",
      headers: new HttpHeaders({"Content-Type": "application/json"}), 
      }).pipe(map((res: any) => res.body));
  }
}
