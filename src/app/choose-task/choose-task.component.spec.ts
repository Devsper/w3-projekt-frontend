import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseTaskComponent } from './choose-task.component';

describe('ChooseTaskComponent', () => {
  let component: ChooseTaskComponent;
  let fixture: ComponentFixture<ChooseTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
