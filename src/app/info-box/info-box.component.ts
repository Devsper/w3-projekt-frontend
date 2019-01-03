import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})

export class InfoBoxComponent implements OnInit {

  // Input values fetched from component element 
  // example: <app-info-box heading="myHeading" subtext="mySubtext"></app-info-box>
  @Input() heading: string;
  @Input() subtext: string;

  constructor() { }

  ngOnInit() {
  }

}
