import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit{

  constructor(private userService: UserService,
              private router: Router) { }


  ngOnInit() {
    
    if(this.userService.checkLoginStatus()){
      this.router.navigate(['/user']);
    }
  }


  onSubmit(submittedForm){

    if(submittedForm.invalid){
      return;
    } 

    let username = submittedForm.value.username.toLowerCase();
    let password = submittedForm.value.password;

    this.userService.login(username, password).subscribe();
  }
}
