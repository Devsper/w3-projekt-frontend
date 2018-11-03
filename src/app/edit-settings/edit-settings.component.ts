import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';

import { AssignmentService } from '../_services/assignment.service';
import { Assignment } from '../_models/assignment';
import { TaskService } from '../_services/task.service';
import { Task } from '../_models/task';
import { all } from 'q';
import { isObject } from 'util';


@Component({
  selector: 'app-edit-settings',
  templateUrl: './edit-settings.component.html',
  styleUrls: ['./edit-settings.component.scss']
})
export class EditSettingsComponent implements OnInit {

  assignments: Assignment[];
  initialCheckboxValues: any[] = [];
  assignmentCheckboxes:any[];
  taskCheckboxes:any[];
  activeRoute;
  showMessage = false;

  constructor(private assignmentService: AssignmentService,
              private taskService: TaskService,
              private router: Router) { }

  ngOnInit() {

    
    if(this.router.url === '/user/edit/assignments'){
      
      this.getAssignmentCheckboxValues();
      this.activeRoute = 'assignments';
      this.showMessage = false;
    }

    if(this.router.url === '/user/edit/tasks'){
      
      this.getTaskCheckboxValues();
      this.activeRoute = 'tasks';
      this.showMessage = false;
    }
  }

  getAssignmentCheckboxValues(){

    let  allAssignments = this.assignmentService.fetchAllAssignments();
    let  activeAssignments = this.assignmentService.fetchEmployeeAssignments();

    forkJoin([allAssignments, activeAssignments]).subscribe(result =>{
    
      let allCheckboxes = result[0];
      let activeCheckboxes = result[1];

      this.assignmentCheckboxes = allCheckboxes.map(element =>{ 

          let foundTask = activeCheckboxes.find(el => el.id == element.id);
          
          if(foundTask){
            (element as any).active = true;
          }else{
            (element as any).active = false;
          }

          return element;
      });

      this.createInitialCheckboxArray();
    });
  }

  getTaskCheckboxValues(){

    let allTasks = this.assignmentService.fetchEmployeeAssignmentTasks();
    let activeTasks = this.taskService.fetchEmployeeActiveTasks();

    forkJoin([allTasks, activeTasks]).subscribe(result =>{
    
      let allTasks = result[0];
      let activeTasks = result[1];
      
      // Goes through every assignment
      this.taskCheckboxes = allTasks.map(element =>{ 

          let currentTasks = element.tasks;

          // Loops through every task in assignment
          currentTasks.forEach(task =>{

            let taskFound = activeTasks.find(element => element.id == task.id);
            
            if(taskFound){
              (task as any).active = true;
            }else{
              (task as any).active = false;
            }
          });

          return element;
      });

      this.createInitialCheckboxArray();
    });
  }

  onChange(a){
    
    let assignmentId = a.id.split("-")[1];
    let assignment = this.assignmentCheckboxes.find(obj => obj.id === assignmentId);
    assignment.active = !assignment.active;
  }

  onSubmit(submittedForm){

    let submittedCheckboxValues = Object.values(submittedForm.value);
    let initialStateChange = false;

    // Determine if checkbox values has changed from initial state
    this.initialCheckboxValues.forEach((element, index) => {

      if(element.active != submittedCheckboxValues[index]){
        initialStateChange = true;
        return;
      }
    });

    console.log(initialStateChange);
    
    let checkedBoxes = this.assignmentCheckboxes.filter(element => element.active == true);
    let idsOfCheckedBoxes = checkedBoxes.map(element => +element.id);

    if(initialStateChange){
      this.assignmentService.updateAssignments(idsOfCheckedBoxes).subscribe(res =>{

        if(res.status == "success"){
          // Updates initial values if values successfully added to database
          this.createInitialCheckboxArray();
          this.showMessage = true;
        }
      });
    }
  }

  private createInitialCheckboxArray(){

    // Creates a copy of array
    if(this.assignmentCheckboxes){
      this.initialCheckboxValues = JSON.parse(JSON.stringify(this.assignmentCheckboxes));
    }

    if(this.taskCheckboxes){
      this.initialCheckboxValues = JSON.parse(JSON.stringify(this.taskCheckboxes));
    }

  }
}
