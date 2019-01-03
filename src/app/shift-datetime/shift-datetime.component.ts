import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';

import { ShiftService } from '../_services/shift.service';

@Component({
  selector: 'app-shift-datetime',
  templateUrl: './shift-datetime.component.html',
  styleUrls: ['./shift-datetime.component.scss']
})
export class ShiftDatetimeComponent implements OnInit {

  // Object of hours available for shift
  hours = [
    {text: "Timme", disabled: true},
    {text: "05", value: 5},{text: "06", value: 6},{text: "07", value: 7},
    {text: "08", value: 8},{text: "09", value: 9},{text: "10", value: 10},
    {text: "11", value: 11},{text: "12", value: 12},{text: "13", value: 13},
    {text: "14", value: 14},{text: "15", value: 15},{text: "16", value: 16},
    {text: "17", value: 17},{text: "18", value: 18},{text: "19", value: 19},
    {text: "20", value: 20},{text: "21", value: 21},{text: "22", value: 22},
  ]
  
  // Object of minutes available for shift
  minutes = [
    {text: "Minut", disabled: true},
    {text: "00", value: 0},{text: "15", value: 15},
    {text: "30", value: 30},{text: "45", value: 45}
  ];

  // Initiates datepicker from ngx-mydatepicker
  datePickerOptions: INgxMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  };

  today = new Date();
  // Creates the model for datepicker
  model: any = { date: { year: this.today.getFullYear(), month: this.today.getMonth()+1, day: this.today.getDate() } };
  
  constructor(private shiftService: ShiftService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }
  
  // Execute code when component initates
  ngOnInit() {

    // Gets the relationship by url parameter
    this.shiftService.currentShift.relationship_Id = +this.route.snapshot.paramMap.get("id");
  }

  // optional date changed callback
  onDateChanged(event: IMyDateModel): void {}

  /**
   * When form is submitted
   * @param {NgForm} submittedForm - The form that was sent
   */
  onSubmit(submittedForm){
    
    if(submittedForm.valid){
      
      // Add variables from form
      let year = submittedForm.value.datepicker.date.year;
      let month = submittedForm.value.datepicker.date.month-1;
      let day = submittedForm.value.datepicker.date.day;
      let startHour = submittedForm.value.startTimeHour;
      let startMinute = submittedForm.value.startTimeMinute;
      let endHour = submittedForm.value.endTimeHour;
      let endMinute = submittedForm.value.endTimeMinute;

      // Create datestamps and add it to current shift
      this.shiftService.currentShift.startTime = new Date(year, month, day, startHour, startMinute);
      this.shiftService.currentShift.endTime = new Date(year, month, day, endHour, endMinute);
      
      // Navigate to next step
      this.router.navigate(['user/shift/overview/new']);
    }
  }

  /**
   * Goes back to  the last location, not the best solution.
   */
  goBack(){
    this.location.back();
  }

}
