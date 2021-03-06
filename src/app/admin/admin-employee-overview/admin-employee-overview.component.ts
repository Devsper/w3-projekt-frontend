import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../_services/employee.service';

import { Employee } from '../../_models/employee';

@Component({
  selector: 'app-admin-employee-overview',
  templateUrl: './admin-employee-overview.component.html',
  styleUrls: ['./admin-employee-overview.component.scss']
})
export class AdminEmployeeOverviewComponent implements OnInit {

  employees: Employee[];
  
  constructor(private router: Router,
              private employeeService: EmployeeService) { }
  
  // Execute code when component initates
  ngOnInit() {
    // Authorizes employee. Not a secure way to authorize administrator
    if(localStorage.employeeAdmin == 'N'){
      this.router.navigate(['user/shift/assignments']);
    }

    // Fetches all employees when component initiates
    this.employeeService.fetchAllEmployees().subscribe(employees => this.employees = employees);
  }

}
