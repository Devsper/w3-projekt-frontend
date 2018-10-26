import { Component, OnInit} from '@angular/core';
import { EmployeeService } from './_services/employee.service';
import { ShiftService } from './_services/shift.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
 
  constructor(private employeeService: EmployeeService,
    private shiftService: ShiftService) { }

  ngOnInit(){
    
    if(this.employeeService.isLoggedIn()){

      console.log("tesdt");
      
      this.employeeService.fetchFromStorage('full');
      this.employeeService.sendLoginStatus(true);
      this.shiftService.initShift();

    }
  }

}
