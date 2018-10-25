import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ShiftService } from '../_services/shift.service';
import { Shift } from '../_models/shift';
import { EmployeeService } from '../_services/employee.service';
import { Employee } from '../_models/employee';

@Component({
  selector: 'app-shift-overview',
  templateUrl: './shift-overview.component.html',
  styleUrls: ['./shift-overview.component.scss']
})
export class ShiftOverviewComponent implements OnInit {

  shiftToAdd: Shift;
  taskId: number;
  currentEmployee: Employee;
  
  constructor(private shiftService: ShiftService,
              private employeeService: EmployeeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.shiftToAdd = this.shiftService.getShiftToAdd();
    this.taskId = this.shiftService.shiftToAdd.relationship_Id;
    this.shiftService.updateShift = false;
    this.currentEmployee = this.employeeService.currentEmployee;
    console.log(this.shiftService.updateShift);
  }
  
  onAddShift(){

    this.shiftService.addShift().subscribe(res =>{
      console.log(res);
      if(res.status == "success"){
        this.router.navigate(['user/shift/success']);
      }
    });
  }

  onUpdate(){
    this.shiftService.updateShift = true;
  }
}
