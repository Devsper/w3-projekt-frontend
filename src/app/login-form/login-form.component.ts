import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeService } from '../_services/employee.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit{

  constructor(private employeeService: EmployeeService,
              private router: Router) {}

  // Execute code when component initates  
  ngOnInit() {

    // Checks if employee is already logged in
    if(localStorage.employeeLoggedIn){
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
