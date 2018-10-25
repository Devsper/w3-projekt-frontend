import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Shift } from '../_models/shift';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  shiftToAdd: Shift;
  updateShift: boolean = false;
  private serverUrl = "http://localhost/w3-projekt/app";

  constructor(private http: HttpClient) {}

  initShift(){
    this.shiftToAdd = new Shift();
    this.updateShift = false;
  }

  getShiftToAdd(){
    return this.shiftToAdd;
  }

  addShift(){
    
    let compensateTimeZone = 2;
    let postUrl = this.serverUrl+"/api/shift.php";
    let postBody:any = this.shiftToAdd;
    postBody.token = localStorage.employeeToken;
    // Stringifying dates removes timezone, so have to compensate
    postBody.startTime.setHours(postBody.startTime.getHours()+compensateTimeZone);
    postBody.endTime.setHours(postBody.endTime.getHours()+compensateTimeZone);

    return this.http.post(postUrl, JSON.stringify(postBody), {
      headers: new HttpHeaders({"Content-Type": "application/json"}),
      observe: "response"
      })
      .pipe(
        map((data: any) => {
          return data.body;
        }));
  }

  resetShift(){
    delete this.shiftToAdd;
  }
}
