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

  showShiftsByMonth: boolean = false;
  showShiftToCreate: boolean = false;
  showSingleShift: boolean = false;

  currentDate = new Date();
  currentMonth = ""+(this.currentDate.getMonth()+1);
  currentYear = ""+this.currentDate.getFullYear();
  shifts: Shift[];

  optionYears = ["2018", "2017"];
  optionMonths = [
                {value: "01", label: "Januari"},
                {value: "02", label: "Februari"},
                {value: "03", label: "Mars"},
                {value: "04", label: "April"},
                {value: "05", label: "Maj"},
                {value: "06", label: "Juni"},
                {value: "07", label: "Juli"},
                {value: "08", label: "Augusti"},
                {value: "09", label: "September"},
                {value: "10", label: "Oktober"},
                {value: "11", label: "November"},
                {value: "12", label: "December"},
                ];
  
  constructor(private shiftService: ShiftService,
              private employeeService: EmployeeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.currentEmployee = this.employeeService.getCurrentEmployee();

    if(this.router.url === '/user/shift/overview/new'){
      
      if(this.shiftService.isShiftCreationActive()){
        
        this.showShiftToCreate = true;
        this.shiftToAdd = this.shiftService.getShiftToAdd();
        this.taskId = this.shiftService.shiftToAdd.relationship_Id;
        
      }else{
        this.router.navigate(['/']);
      }
    
    }else if(this.router.url === '/user/shift/overview'){

      this.showShiftsByMonth = true;
      let fetchDate = this.formatDate(this.currentYear, this.currentMonth);

      this.shiftService.fetchShiftsByDate(fetchDate).subscribe(shifts =>{

        this.shifts = shifts;

      });
    }
  }
  
  onSubmitShift(){

    this.shiftService.createShift().subscribe(res =>{

      if(res.status == "success"){
        this.router.navigate(['user/shift/success']);
      }
    });
  }

  onDateSubmit(submittedForm){
    
    let fetchDate = this.formatDate(submittedForm.value.byYear, submittedForm.value.byMonth);

    this.shiftService.fetchShiftsByDate(fetchDate).subscribe(shifts =>{

      this.shifts = shifts;
    });

  }

  onUpdate(){
    this.shiftService.updateShift = true;
  }

  private formatDate(year, month): string{

    return year+"-"+month;
  }
}
