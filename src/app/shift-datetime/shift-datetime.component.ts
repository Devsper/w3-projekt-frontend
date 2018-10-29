import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';

import { Shift } from '../_models/shift';
import { ShiftService } from '../_services/shift.service';

@Component({
  selector: 'app-shift-datetime',
  templateUrl: './shift-datetime.component.html',
  styleUrls: ['./shift-datetime.component.scss']
})
export class ShiftDatetimeComponent implements OnInit {

  hours = [
    {text: "Timme", disabled: true},
    {text: "05", value: 5},{text: "06", value: 6},{text: "07", value: 7},
    {text: "08", value: 8},{text: "09", value: 9},{text: "10", value: 10},
    {text: "11", value: 11},{text: "12", value: 12},{text: "13", value: 13},
    {text: "14", value: 14},{text: "15", value: 15},{text: "16", value: 16},
    {text: "17", value: 17},{text: "18", value: 18},{text: "19", value: 19},
    {text: "20", value: 20},{text: "21", value: 21},{text: "22", value: 22},
  ]
  
  minutes = [
    {text: "Minut", disabled: true},
    {text: "00", value: 0},{text: "15", value: 15},
    {text: "30", value: 30},{text: "45", value: 45}
  ];

  datePickerOptions: INgxMyDpOptions = {
    
    dateFormat: 'yyyy-mm-dd'
  };

  today = new Date();
  model: any = { date: { year: this.today.getFullYear(), month: this.today.getMonth()+1, day: this.today.getDate() } };
  
  constructor(private shiftService: ShiftService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.shiftService.shiftToAdd.relationship_Id = +this.route.snapshot.paramMap.get("id");
  }

  // optional date changed callback
  onDateChanged(event: IMyDateModel): void {
    
  }

  onSubmit(submittedForm){
    
    if(submittedForm.valid){
      
      let year = submittedForm.value.datepicker.date.year;
      let month = submittedForm.value.datepicker.date.month-1;
      let day = submittedForm.value.datepicker.date.day;
      let startHour = submittedForm.value.startTimeHour;
      let startMinute = submittedForm.value.startTimeMinute;
      let endHour = submittedForm.value.endTimeHour;
      let endMinute = submittedForm.value.endTimeMinute;

      this.shiftService.shiftToAdd.startTime = new Date(year, month, day, startHour, startMinute);
      this.shiftService.shiftToAdd.endTime = new Date(year, month, day, endHour, endMinute);
      
      this.router.navigate(['user/shift/overview/new']);
    }
  }

}
