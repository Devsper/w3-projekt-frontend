import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';

import { AssignmentService } from '../_services/assignment.service';
import { Assignment } from '../_models/assignment';
import { TaskService } from '../_services/task.service';
import { Task } from '../_models/task';


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
    });
  }

  onChange(a){
    
    let checkboxId = a.id.split("-")[1];
    
    if(this.assignmentCheckboxes){

      let assignment = this.assignmentCheckboxes.find(obj => obj.id === checkboxId);
      assignment.active = !assignment.active;
    }

    if(this.taskCheckboxes){
    
      this.taskCheckboxes.forEach(element => {
        
        let task = element.tasks.find(obj => obj.id === checkboxId) || {};
        task.active = !task.active;
      });
    }
  }


  onSubmit(submittedForm){

    //let submittedCheckboxValues = Object.values(submittedForm.value);
    let checkedBoxes = [];

    //if(!this.hasCheckboxesChanged(submittedCheckboxValues)){ return }

    if(this.assignmentCheckboxes){
      checkedBoxes = this.assignmentCheckboxes.filter(element => element.active == true);
    }else if(this.taskCheckboxes){

      this.taskCheckboxes.forEach(element => {
        
        let tasks = element.tasks.filter(e => e.active == true);
        checkedBoxes.push(tasks);
      });
      checkedBoxes = checkedBoxes.concat.apply([], checkedBoxes);
    }

    let idsOfCheckedBoxes = checkedBoxes.map(element => +element.id);
    
    if(this.assignmentCheckboxes){
      this.submitAssignments(idsOfCheckedBoxes);
    }else if(this.taskCheckboxes){
      this.submitTasks(idsOfCheckedBoxes);
    }

  }

  private submitAssignments(idsOfCheckedBoxes){
    
    this.assignmentService.updateAssignments(idsOfCheckedBoxes).subscribe(res =>{

      if(res.status == "success"){
        // Updates initial values if values successfully added to database
        //this.createInitialCheckboxArray();
        this.showMessage = true;
      }
    });

  }

  private submitTasks(idsOfCheckedBoxes){

    this.taskService.updateTasks(idsOfCheckedBoxes).subscribe(res =>{

      if(res.status == "success"){
        // Updates initial values if values successfully added to database
        //this.createInitialCheckboxArray();
        this.showMessage = true;
      }
    });
  }

  // private createInitialCheckboxArray(){

  //   // Creates a copy of array
  //   if(this.assignmentCheckboxes){
  //     this.initialCheckboxValues = JSON.parse(JSON.stringify(this.assignmentCheckboxes));
  //   }

  //   if(this.taskCheckboxes){
  //     this.initialCheckboxValues = JSON.parse(JSON.stringify(this.taskCheckboxes));
  //   }
  // }

  // private hasCheckboxesChanged(submittedValues){
    
  //   let initialStateChange = false;
  //   // Determine if checkbox values has changed from initial state
  //   this.initialCheckboxValues.forEach((element, index) => {
      
  //     if(element.active != submittedValues[index]){
        
  //       initialStateChange = true;
  //       return initialStateChange;
  //     }
  //   });

  //   return initialStateChange;
  // }
}
