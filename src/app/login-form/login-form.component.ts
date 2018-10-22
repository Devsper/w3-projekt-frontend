import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeService } from '../_services/employee.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit{

  username = "mibe";
  password = "1234";

  constructor(private employeeService: EmployeeService,
              private router: Router) { }


  ngOnInit() {
    
    if(this.employeeService.checkLoginStatus()){
      this.router.navigate(['/user']);
    }
  }

  onSubmit(submittedForm){

    if(submittedForm.invalid){
      return;
    } 

    let username = submittedForm.value.username.toLowerCase();
    let password = submittedForm.value.password;

    this.employeeService.login(username, password).subscribe((redirectPath) =>{
      
      if(redirectPath == "assignments"){
        this.router.navigate(['/user/choose-assignment']);
      }

      if(redirectPath == "tasks"){
        this.router.navigate(['/user/choose-task']);
      }

    });
  }
}
