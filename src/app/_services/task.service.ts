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

  constructor(private http: HttpClient,
              private employeeService: EmployeeService) { }

  private serverUrl = 'http://localhost/w3-projekt/app';
  
  getTasks(){

    let getDataUrl = this.serverUrl+"/get_data.php";
    let postBody = {
      "getData": "employeeTasks",
      "token": this.authToken,
      "employee_Id": this.employeeService.getCurrentEmployeeId()
    }

    return this.http.post(getDataUrl, postBody ,{
      
      observe: "response",
      headers: new HttpHeaders({"Content-Type": "application/json"}) 
      })
              .pipe(
                map((res: any) =>{
                  
                  let data = res.body.data;
                  let distinctKeys = new Set(data.map(obj => obj.task));
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
                    let subtask: Subtask = { "name": element.subtask, "id": element.subtaskId };
                    // Finds correct array to push subtask to
                    let objectToPush: Task = tasks.find(obj => obj.name == element.task);

                    objectToPush.subtasks.push(subtask);
                  });

                  return tasks;
                })
              );
  }
}
