import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ShiftService } from '../../_services/shift.service';
import { Employee } from '../../_models/employee';

@Component({
  selector: 'app-admin-employee-calculate',
  templateUrl: './admin-employee-calculate.component.html',
  styleUrls: ['./admin-employee-calculate.component.scss']
})
export class AdminEmployeeCalculateComponent implements OnInit {

  employees: Employee[];

  constructor(private router: Router,
    private shiftService: ShiftService) { }
  
  // Execute code when component initates
  ngOnInit() {
    
    // Authorizes employee. Not a secure way to authorize administrator
    if(localStorage.employeeAdmin == 'N'){
      this.router.navigate(['user/shift/assignments']);
    }
  }

  /**
   * Fetches employee and shifts form service when button is clicked
   * @memberof AdminEmployeeCalculateComponent
   */
  onClick(){
    this.shiftService.fetchHours().subscribe(employees => this.employees = employees);
  }
}
