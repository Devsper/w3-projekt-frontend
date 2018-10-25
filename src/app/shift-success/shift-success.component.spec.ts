import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftSuccessComponent } from './shift-success.component';

describe('ShiftSuccessComponent', () => {
  let component: ShiftSuccessComponent;
  let fixture: ComponentFixture<ShiftSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
