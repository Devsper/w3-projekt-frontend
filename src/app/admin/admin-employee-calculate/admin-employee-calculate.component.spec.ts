import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeeCalculateComponent } from './admin-employee-calculate.component';

describe('AdminEmployeeCalculateComponent', () => {
  let component: AdminEmployeeCalculateComponent;
  let fixture: ComponentFixture<AdminEmployeeCalculateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEmployeeCalculateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmployeeCalculateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
