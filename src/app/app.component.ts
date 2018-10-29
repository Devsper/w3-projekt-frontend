import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeService } from './_services/employee.service';
import { ShiftService } from './_services/shift.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(
              private employeeService: EmployeeService,
              private router: Router,
              private shiftService: ShiftService
              ){}

  ngOnInit(){

    if(this.employeeService.isLoggedIn()){
      
      this.shiftService.initShift();
    }else{
      this.router.navigate(['/login']);
    }
  }

}
