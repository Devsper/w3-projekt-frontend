import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeService } from '../_services/employee.service';
import { ShiftService } from '../_services/shift.service';
import { Employee } from '../_models/employee';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit{

  username = "mibe";
  password = "1234";

  constructor(private employeeService: EmployeeService,
              private shiftService: ShiftService,
              private router: Router) {}


  ngOnInit() {

    if(localStorage.employeeLoggedIn){

      let employee: Employee = this.employeeService.getCurrentEmployee();
      this.router.navigate(['user/shift/assignments']);
    }
  }

  onSubmit(submittedForm){

    if(submittedForm.invalid){
      return;
    } 

    let username = submittedForm.value.username.toLowerCase();
    let password = submittedForm.value.password;

    this.employeeService.login(username, password).subscribe((success) =>{

      if(success){
        this.router.navigate(['user/shift/assignments']);
      }
    });
  }
}
