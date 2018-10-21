import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../_services/employee.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.isEmployeeAllowed();
  }

  onLogout(){
    this.employeeService.logout();
  }
}
