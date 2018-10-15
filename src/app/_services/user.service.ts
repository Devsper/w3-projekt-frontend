import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLoggedIn = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  login(username: string, password: string){
    
    let loginUrl = "http://localhost/w3-projekt/app/login.php";
    let body = { "user": username, "pass": password};

    return this.http.post(loginUrl, body, {
      
      headers: new HttpHeaders({"Content-Type": "application/json"}),
      observe: "response"

    }).pipe(
       map((data: any) => {

          if(data.body.message == true){
            this.userLoggedIn.next(true);
          }else{
            this.userLoggedIn.next(false);
          }
        }));
  }
}
