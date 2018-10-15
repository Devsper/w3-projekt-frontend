import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLoggedIn = localStorage.userLoggedIn || false;

  constructor(private http: HttpClient,
              private router: Router) { }

  login(username: string, password: string){
    
    let loginUrl = "http://localhost/w3-projekt/app/login.php";
    let body = { "user": username, "pass": password};

    return this.http.post(loginUrl, body, {
      
      headers: new HttpHeaders({"Content-Type": "application/json"}),
      observe: "response"

      }).pipe(
        map((data: any) => {

            if(data.body.message == true){

              this.userLoggedIn = true;
              localStorage.userLoggedIn = true;
              this.router.navigate(['/user']);
            }
          }));
  }

  logout(){

    let logoutUrl = "http://localhost/w3-projekt/app/logout.php";

    return this.http.get(logoutUrl).subscribe(
      () => {
        this.userLoggedIn = false;
        localStorage.removeItem("userLoggedIn");
        this.router.navigate(['/'])}
      );
  }
  
  checkLoginStatus(){
    return this.userLoggedIn;
  }

  isUserAllowed(){
    if(!this.userLoggedIn){
      this.router.navigate(['/']);
    }
  }
}
