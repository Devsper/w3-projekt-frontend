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

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    
  }
  
  ngOnDestroy(){

  }

  // onLogout(){
  //   this.employeeService.logout().subscribe(() =>{

  //     this.employeeLoggedIn = false;
  //   });
  // }

}
