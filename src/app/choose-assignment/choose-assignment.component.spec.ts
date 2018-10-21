import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAssignmentComponent } from './choose-assignment.component';

describe('ChooseAssignmentComponent', () => {
  let component: ChooseAssignmentComponent;
  let fixture: ComponentFixture<ChooseAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
