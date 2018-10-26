import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../_services/employee.service';
import { ShiftService } from '../_services/shift.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private employeeService: EmployeeService,
              private shiftService: ShiftService) { }

  ngOnInit() {
    
  }
}
