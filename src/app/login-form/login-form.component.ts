import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService,
              private router: Router) { }
          
  subscription;

  ngOnInit() {

    this.subscription = this.userService.userLoggedIn.subscribe(
      (success) =>{

        console.log(success);
        if(success){

          this.router.navigate(['/user']);
        }
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
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
