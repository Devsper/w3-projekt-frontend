import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ShiftService } from '../_services/shift.service';
import { Shift } from '../_models/shift';

@Component({
  selector: 'app-shift-overview',
  templateUrl: './shift-overview.component.html',
  styleUrls: ['./shift-overview.component.scss']
})
export class ShiftOverviewComponent implements OnInit {

  currentShift: Shift;
  taskId: number;

  showShiftsByMonth: boolean = false;
  showShiftToCreate: boolean = false;
  showSingleShift: boolean = false;

  currentDate = new Date();
  // Creates a string from  date, adds a leading zero
  // If month is double digit slice -2 will remove the leading zero
  currentMonth = ("0"+(this.currentDate.getMonth()+1)).slice(-2);
  currentYear = ""+this.currentDate.getFullYear();
  shifts: Shift[];

  optionYears = ["2019", "2018", "2017"]; // Hardcoded
  // Months to be shown as options
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
              private router: Router) { }

  // Execute code when component initates
  ngOnInit() {

    // If shift is being created
    if(this.router.url === '/user/shift/overview/new'){
      
      if(this.shiftService.isShiftCreationActive()){
        
        this.showShiftToCreate = true;
        // Fetch the current shift
        this.currentShift = this.shiftService.getShift();
        this.taskId = this.shiftService.currentShift.relationship_Id;
      }else{
        this.router.navigate(['/']);
      }
    
    }else if(this.router.url === '/user/shift/overview'){

      this.showShiftsByMonth = true;
      
      // Formats the date to be sent to server
      let fetchDate = this.currentYear +"-"+ this.currentMonth

      // Fetches all shifts by current year and month
      this.shiftService.fetchShiftsByDate(fetchDate).subscribe(shifts => this.shifts = shifts);
    }
  }
  
  /**
   * Attempts to create shift
   */
  onSubmitShift(){

    this.shiftService.createShift().subscribe(res =>{

      if(res){
        // Redirects employee if creation successful
        this.router.navigate(['user/shift/success']);
      }
    });
  }

  /**
   * Fetches shifts by year and month
   * @param {NgForm} submittedForm - Submitted form
   */
  onDateSubmit(submittedForm){
    
    // Formats the date to be sent to server
    let fetchDate = submittedForm.value.byYear+"-"+submittedForm.value.byMonth;

    this.shiftService.fetchShiftsByDate(fetchDate).subscribe(shifts =>{

      this.shifts = shifts;
    });

  }

  /**
   * Change value to indicate shift is being updated
   */
  onUpdate(){
    this.shiftService.updateShift = true;
  }
}
