import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { AssignmentService } from '../_services/assignment.service';
import { Assignment } from '../_models/assignment';
import { TaskService } from '../_services/task.service';


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
              private router: Router) {}
  
  // Execute code when component initates
  ngOnInit() {

    
    if(this.router.url === '/user/edit/assignments'){
      
      // Get assignment checkboxes and checked status that should be created
      this.getAssignmentCheckboxValues();
      this.activeRoute = 'assignments';
      this.showMessage = false;
    }

    if(this.router.url === '/user/edit/tasks'){
      
      // Get task checkboxes and checked status that should be created
      this.getTaskCheckboxValues();
      this.activeRoute = 'tasks';
      this.showMessage = false;
    }
  }

  /**
   * Fetches assignments and determine if they should be active or not
   */
  getAssignmentCheckboxValues(): void{

    // Fetches all assignments
    let  allAssignments = this.assignmentService.fetchAllAssignments();
    // Fetches only active assignments for employee
    let  activeAssignments = this.assignmentService.fetchEmployeeAssignments();

    // Joins two Obserables together and executes logic when both has responded with values
    forkJoin([allAssignments, activeAssignments]).subscribe(result =>{
    
      let allCheckboxes = result[0];
      let activeCheckboxes = result[1];

      // Goes through every assignment
      this.assignmentCheckboxes = allCheckboxes.map(element =>{ 

          // Searches for matching elements
          let foundTask = activeCheckboxes.find(el => el.id == element.id);
          
          // Adds active value depending on search result
          if(foundTask){
            // as any needed to circumvent assignment object properties
            (element as any).active = true;
          }else{
            (element as any).active = false;
          }

          return element;
      });
    });
  }

  /**
   * Fetches tasks and determine if they should be active or not
   */
  private getTaskCheckboxValues(): void{

    // Fetches all tasks
    let allTasks = this.assignmentService.fetchEmployeeAssignmentTasks();
    // Fetches only active tasks for employee
    let activeTasks = this.taskService.fetchEmployeeActiveTasks();

    // Joins two Obserables together and executes logic when both has responded with values
    forkJoin([allTasks, activeTasks]).subscribe(result =>{
      
      let allTasks = result[0];
      let activeTasks = result[1];

      // Goes through every assignment
      this.taskCheckboxes = allTasks.map(element =>{ 

          let currentTasks = element.tasks;
          // Loops through every task in assignment
          currentTasks.forEach(task =>{

            // Searches for matching elements
            let taskFound = activeTasks.find(element => element.id == task.id);
            
            // Adds active value depending on search result
            if(taskFound){
              // as any needed to circumvent task object properties
              (task as any).active = true;
            }else{
              (task as any).active = false;
            }
          });

          return element;
      });
    });
  }

  /**
   * Change value of checkbox
   * @param {HTMLInputElement} input - Input element of the checked checkbox
   */
  onChange(input: HTMLInputElement){
    
    // Gets numerical value from id
    let checkboxId = input.id.split("-")[1];
    
    if(this.assignmentCheckboxes){

      // Find the right value in variable from id
      let assignment = this.assignmentCheckboxes.find(obj => obj.id === checkboxId);
      // Toggle value
      assignment.active = !assignment.active;
    }

    if(this.taskCheckboxes){
    
      this.taskCheckboxes.forEach(element => {
        
        // Find the right value in variable from id
        let task = element.tasks.find(obj => obj.id === checkboxId) || {};
        // Toggle value
        task.active = !task.active;
      });
    }
  }

  /**
   * When form is submitted
   */
  onSubmit(){

    let checkedBoxes = [];

    if(this.assignmentCheckboxes){
      // Find all checked boxes
      checkedBoxes = this.assignmentCheckboxes.filter(element => element.active == true);
    }else if(this.taskCheckboxes){

      this.taskCheckboxes.forEach(element => {
        
        // Find all checked boxes
        let tasks = element.tasks.filter(e => e.active == true);
        checkedBoxes.push(tasks);
      });

      // Flattens array
      checkedBoxes = checkedBoxes.concat.apply([], checkedBoxes);
    }

    // Convert id numbers to string
    let idsOfCheckedBoxes = checkedBoxes.map(element => +element.id);
    
    if(this.assignmentCheckboxes){
      this.submitAssignments(idsOfCheckedBoxes);
    }else if(this.taskCheckboxes){
      this.submitTasks(idsOfCheckedBoxes);
    }

  }

  /**
   * Attempts to submit changes to service
   * @param {string} idsOfCheckedBoxes 
   */
  private submitAssignments(idsOfCheckedBoxes){
    
    this.assignmentService.updateAssignments(idsOfCheckedBoxes).subscribe((res: boolean) =>{

      if(res){
        this.showMessage = true;
      }
    });

  }

  /**
   * Attempts to submit changes to service
   * @param {string} idsOfCheckedBoxes 
   */
  private submitTasks(idsOfCheckedBoxes){

    this.taskService.updateTasks(idsOfCheckedBoxes).subscribe((res: boolean) =>{

      if(res){
        this.showMessage = true;
      }
    });
  }
}
