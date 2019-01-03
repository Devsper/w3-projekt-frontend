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
  constructor(private shiftService: ShiftService,
              private employeeService: EmployeeService) { }

  // Execute code when component initates
  ngOnInit() {
    // Fetches date for current shift
    this.date = this.shiftService.currentShift.startTime;
    // Resets shift object
    this.shiftService.resetShift();
  }

  /**
   * Logs out the employee
   */
  onLogout(){
    this.employeeService.logout().subscribe();
  }
}
