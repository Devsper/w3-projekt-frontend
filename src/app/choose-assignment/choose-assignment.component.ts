import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../_services/employee.service';

@Component({
  selector: 'app-choose-assignment',
  templateUrl: './choose-assignment.component.html',
  styleUrls: ['./choose-assignment.component.scss']
})
export class ChooseAssignmentComponent implements OnInit {

  constructor(private EmployeeService: EmployeeService) { }

  ngOnInit() {
    this.EmployeeService.isEmployeeAllowed();
  }

  onLogout(){
    this.EmployeeService.logout();
  }

}
