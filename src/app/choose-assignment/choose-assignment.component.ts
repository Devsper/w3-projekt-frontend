import { Component, OnInit } from '@angular/core';

import { AssignmentService } from '../_services/assignment.service';
import { EmployeeService } from '../_services/employee.service';
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

  constructor(private assignmentService: AssignmentService,
              private employeeService: EmployeeService) { }

  ngOnInit() {
    
    if(this.employeeService.currentEmployee){
      this.currentEmployee = this.employeeService.currentEmployee
    }else{
      this.employeeService.getCurrentEmployee().subscribe((employee) =>{
        this.currentEmployee = employee;
      });
    }

    this.assignmentService.getAssignments().subscribe();
  }

  onLogout(){
    this.employeeService.logout().subscribe();
  }

}
