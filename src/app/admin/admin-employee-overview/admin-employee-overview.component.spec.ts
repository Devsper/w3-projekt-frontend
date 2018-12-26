import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeeOverviewComponent } from './admin-employee-overview.component';

describe('AdminEmployeeOverviewComponent', () => {
  let component: AdminEmployeeOverviewComponent;
  let fixture: ComponentFixture<AdminEmployeeOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEmployeeOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmployeeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
