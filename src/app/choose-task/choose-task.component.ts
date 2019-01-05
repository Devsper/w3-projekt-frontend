import { Component, OnInit } from '@angular/core';

import { TaskService } from '../_services/task.service';
import { ShiftService } from '../_services/shift.service';
import { Employee } from '../_models/employee';
import { Task } from '../_models/task';

@Component({
  selector: 'app-choose-task',
  templateUrl: './choose-task.component.html',
  styleUrls: ['./choose-task.component.scss']
})
export class ChooseTaskComponent implements OnInit {

  currentEmployee: Employee|null = null;
  tasks: Task[];
  backToOverview;

  constructor(private taskService: TaskService,
              private shiftService: ShiftService) { }

  // Execute code when component initates
  ngOnInit() {
    // Determine if shift is being updated and should go back to overview when changed
    this.backToOverview = this.shiftService.isShiftBeingUpdated();
    
    // Fetches tasks and subtasks from service when component initialises
    this.taskService.fetchTasksSubtasks().subscribe(tasks =>{
      // Fetched tasks
      this.tasks = tasks;

    });
  }

  /**
   * Adds an task/subtask to the current shift
   * @param {HTMLAnchorElement} usedLink - The anchor element that was used
   * @memberof ChooseAssignmentComponent
   */
  addTask(usedLink){

    this.shiftService.currentShift.taskName = usedLink.text; // Fetch name from anchor text
    this.shiftService.currentShift.shiftType = "subtask";
    this.shiftService.currentShift.relationship_Id = usedLink.id || null;
  }
}
