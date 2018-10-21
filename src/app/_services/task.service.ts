import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Task } from '../_models/task';
import { Subtask } from '../_models/subtask';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  //tasks: Task[];

  constructor(private http: HttpClient,
              private router: Router) { }

  private serverUrl = 'http://localhost/w3-projekt/app';
  
  getTasks(){

    let getDataUrl = this.serverUrl+"/get_data.php";

    return this.http.get(getDataUrl, {
      
      withCredentials: true,
      observe: "response",
      headers: new HttpHeaders({"Content-Type": "application/json"}), 
      params: {getData: 'employeeTasks'}})
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
