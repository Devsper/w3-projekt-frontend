import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { TaskService } from '../_services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks;
  subscription;

  constructor(private taskService: TaskService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
      // Fetch public/user decks depending on id is present or not 
      this.activatedRoute.params.subscribe((params) => {
            // console.log(params['id']);
            // console.log(params['id2']);
            this.loadTask(params['id'], params['id2']);
      });

      this.loadAllTasks();
    
    // Subscribes to a Subject, will fire when 'decksFetched' in service changes
    this.subscription = this.taskService.tasksFetched.subscribe(
      () => {
        // Adds decks from service to component
        this.tasks = this.taskService.tasks;
      }
  );

  }

  public loadAllTasks(){
    //this.taskService.getAllTasks();
  }

  public loadTask(id1, id2){
    this.taskService.getTask(id1, id2);
  }

}
