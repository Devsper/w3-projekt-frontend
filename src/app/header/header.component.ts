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
  
  subscription: Subscription;
  currentEmployee: Employee;
  isEmployeeLoggedIn: boolean;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    
    this.subscription = this.employeeService.listenToLoginStatus().subscribe((loginStatus) => {
      
      this.isEmployeeLoggedIn = loginStatus
      this.currentEmployee = this.employeeService.getCurrentEmployee();
    } );
    
    this.currentEmployee = this.employeeService.getCurrentEmployee();
    this.isEmployeeLoggedIn = this.employeeService.isLoggedIn();
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onLogout(){
    this.employeeService.logout().subscribe(() => this.employeeService.employeeLoggedIn = false);
  }

}
