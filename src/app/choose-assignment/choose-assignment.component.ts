import { Component, OnInit } from '@angular/core';

import { AssignmentService } from '../_services/assignment.service';
import { EmployeeService } from '../_services/employee.service';
import { ShiftService } from '../_services/shift.service';
import { Employee } from '../_models/employee';
import { Assignment } from '../_models/assignment';

@Component({
  selector: 'app-choose-assignment',
  templateUrl: './choose-assignment.component.html',
  styleUrls: ['./choose-assignment.component.scss']
})
export class ChooseAssignmentComponent implements OnInit {

  currentEmployee: Employee|null = null;
  assignments: Assignment[];
  backToOverview;

  constructor(private assignmentService: AssignmentService,
              private employeeService: EmployeeService,
              private shiftService: ShiftService) {}

  ngOnInit() {

    // Determine if shift is being updated and should go back to overview when changed
    this.backToOverview = this.shiftService.isShiftBeingUpdated();
    console.log(this.backToOverview);

    // Fetches assignments from service
    this.assignmentService.fetchEmployeeAssignments().subscribe(assignments =>{
      // Fetched assignments
      this.assignments = assignments;
    });
  }

  addTask(usedLink){
    
    if(!this.shiftService.isShiftBeingUpdated()){
      this.shiftService.initShift();
    }
    
    this.shiftService.shiftToAdd.relationship_Id = usedLink.id;
    this.shiftService.shiftToAdd.taskName = usedLink.text;
    this.shiftService.shiftToAdd.shiftType = "assignment";

    console.log(this.shiftService.shiftToAdd);
  }
}
