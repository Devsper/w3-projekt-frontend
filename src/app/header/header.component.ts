import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../_services/employee.service';
import { Employee } from '../_models/employee';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  subscription: Subscription;
  currentEmployee: Employee;
  isEmployeeLoggedIn: boolean;

  constructor(private employeeService: EmployeeService) { }

  // Execute code when component initates
  ngOnInit() {
    
    // Creates a subsciption that listens to login status changes
    this.subscription = this.employeeService.listenToLoginStatus().subscribe((loginStatus) => {
      
      this.isEmployeeLoggedIn = loginStatus
      this.currentEmployee = this.employeeService.getCurrentEmployee();
    } );
    
    this.currentEmployee = this.employeeService.getCurrentEmployee();
    // Checks if employee is already logged in
    this.isEmployeeLoggedIn = this.employeeService.isLoggedIn();
  }
  
  // Execute code when component is destroyed
  ngOnDestroy(){
    // Unsubscribes subscription will prevent memory leaks
    this.subscription.unsubscribe();
  }

  /**
   * When employee logs out
   */
  onLogout(){
    this.employeeService.logout().subscribe(() => this.employeeService.employeeLoggedIn = false);
  }

}
