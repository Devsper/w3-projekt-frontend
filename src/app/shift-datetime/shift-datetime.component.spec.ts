import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftDatetimeComponent } from './shift-datetime.component';

describe('ShiftDatetimeComponent', () => {
  let component: ShiftDatetimeComponent;
  let fixture: ComponentFixture<ShiftDatetimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftDatetimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftDatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
