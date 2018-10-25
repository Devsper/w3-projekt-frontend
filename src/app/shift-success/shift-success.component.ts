import { Component, OnInit } from '@angular/core';

import { ShiftService } from '../_services/shift.service';
import { EmployeeService } from '../_services/employee.service';
import { Employee } from '../_models/employee';

@Component({
  selector: 'app-shift-success',
  templateUrl: './shift-success.component.html',
  styleUrls: ['./shift-success.component.scss']
})
export class ShiftSuccessComponent implements OnInit {

  date: Date;
  currentEmployee: Employee;

  constructor(private shiftService: ShiftService,
              private employeeService: EmployeeService) { }

  ngOnInit() {
    this.date = this.shiftService.shiftToAdd.startTime;
    this.currentEmployee = this.employeeService.currentEmployee;
    this.shiftService.resetShift();
  }

  onLogout(){
    this.employeeService.logout().subscribe();
  }
}
