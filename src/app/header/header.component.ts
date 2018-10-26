import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../_services/employee.service';
import { Employee } from '../_models/employee';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  employeeLoggedIn;
  currentEmployee: Employee;
  subscription: Subscription;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    
    this.currentEmployee = this.employeeService.getCurrentEmployee();

    this.subscription = this.employeeService.isLoggedIn(true).subscribe(loginStatus => { 
      this.employeeLoggedIn = loginStatus;
    });
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onLogout(){
    this.employeeService.logout().subscribe(() =>{

      this.employeeLoggedIn = false;
    });
  }

}
