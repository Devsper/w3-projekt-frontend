import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from './_services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private employeeService: EmployeeService,
              private router: Router){}
  
  // Execute code when component initates
  ngOnInit(){

    // If user is not logged in send them to login component
    if(!this.employeeService.isLoggedIn()){
      this.router.navigate(['/login']);
    }
  }

}
