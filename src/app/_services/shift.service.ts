import { Injectable } from '@angular/core';

import { Shift } from '../_models/shift';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  shiftToAdd: Shift;

  constructor() {}

  initShift(){
    this.shiftToAdd = new Shift();
  }

  getIncompleteShift(){
    return this.shiftToAdd;
  }
}
