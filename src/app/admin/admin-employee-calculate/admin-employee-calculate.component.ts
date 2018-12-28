import { Component, OnInit } from '@angular/core';
import { ShiftService } from '../../_services/shift.service';
import { Employee } from '../../_models/employee';

@Component({
  selector: 'app-admin-employee-calculate',
  templateUrl: './admin-employee-calculate.component.html',
  styleUrls: ['./admin-employee-calculate.component.scss']
})
export class AdminEmployeeCalculateComponent implements OnInit {

  employees: Employee[];

  constructor(private shiftService: ShiftService) { }

  ngOnInit() {
  }

  onClick(){
    this.shiftService.fetchHours().subscribe(employees => {this.employees = employees; console.log(this.employees)});
  }
}
