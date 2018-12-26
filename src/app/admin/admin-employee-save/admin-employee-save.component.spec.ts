import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeeSaveComponent } from './admin-employee-save.component';

describe('AdminEmployeeSaveComponent', () => {
  let component: AdminEmployeeSaveComponent;
  let fixture: ComponentFixture<AdminEmployeeSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEmployeeSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmployeeSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
