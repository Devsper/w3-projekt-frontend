import { Component, OnInit } from '@angular/core';

import { AssignmentService } from '../_services/assignment.service';
import { TaskService } from '../_services/task.service';
import { ShiftService } from '../_services/shift.service';
import { Assignment } from '../_models/assignment';

@Component({
  selector: 'app-choose-assignment',
  templateUrl: './choose-assignment.component.html',
  styleUrls: ['./choose-assignment.component.scss']
})
export class ChooseAssignmentComponent implements OnInit {

  assignments: Assignment[];
  backToOverview;

  constructor(private assignmentService: AssignmentService,
              private taskService: TaskService,
              private shiftService: ShiftService) {}
  
  // Execute code when component initates
  ngOnInit() {

    // Determine if shift is being updated and should go back to overview when changed
    this.backToOverview = this.shiftService.isShiftBeingUpdated();

    // Fetches assignments from service when component initialises
    this.assignmentService.fetchEmployeeAssignments().subscribe(assignments =>{
      // Fetched assignments
      this.assignments = assignments;
    });
  }

  /**
   * Adds an assignment to the current shift
   * @param {HTMLAnchorElement} usedLink - The anchor element that was used
   * @memberof ChooseAssignmentComponent
   */
  addTask(usedLink){
    
    // Initiate new shift if no current shift is found
    if(!this.shiftService.isShiftBeingUpdated()){
      this.shiftService.initShift();
    }
    
    // Adds information to register an assignment without subtasks
    // If subtasks are available this will be overwritten in the next step
    this.shiftService.currentShift.relationship_Id = usedLink.id || null; // id of assignment
    this.shiftService.currentShift.taskName = usedLink.text; // Fetch name from anchor text
    this.shiftService.currentShift.shiftType = "assignment";

    this.taskService.assignmentId = usedLink.id;

  }
}
