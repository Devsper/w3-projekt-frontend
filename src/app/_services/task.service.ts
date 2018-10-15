import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Task } from '../_models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasksFetched = new Subject<void>();
  tasks: any;

  constructor(private http: Http,
              private router: Router) { }

  private serverAPI = 'http://localhost/w3-projekt/app/api';
  // getAllTasks(){

  //   let URL = this.serverAPI+"/task.php";

  //   // Sends GET-request to API
  //   return this.http.get(URL).pipe(
  //     map((response: Response) => {

  //     // Restructure the data fetched from API
  //     let data = response.json();
  //     let decks = data;
  //     console.log(data);
  //     // Sends data to .subscribe()
  //     return decks
  //   })).subscribe((data) =>{

  //     // Binds data from API to service variable
  //     this.tasks = data;
  //     // Makes subject emmit an event for subscribers that decks have been fetched
  //     this.tasksFetched.next();
      
  //   },(err) =>{
  //     console.log(err);
  //   });
  // }

  getTask(id1, id2){

    let URL = this.serverAPI+"/task.php?id1="+id1+"&id2="+id2;

    return this.http.get(URL).pipe(
      map((response: Response) => {

      // Restructure the data fetched from API
      let data = response.json();
      let decks = data;
      console.log(data);
      // Sends data to .subscribe()
      return decks
    })).subscribe((data) =>{

      // Binds data from API to service variable
      this.tasks = data;
      // Makes subject emmit an event for subscribers that decks have been fetched
      this.tasksFetched.next();
      
    },(err) =>{
      console.log(err);
    });
  }
}
