import { Component, OnInit } from '@angular/core';

import { TaskService } from '../_services/task.service';
import { EmployeeService } from '../_services/employee.service';
import { ShiftService } from '../_services/shift.service';
import { Employee } from '../_models/employee';
import { Task } from '../_models/task';

@Component({
  selector: 'app-choose-task',
  templateUrl: './choose-task.component.html',
  styleUrls: ['./choose-task.component.scss']
})
export class ChooseTaskComponent implements OnInit {

  currentEmployee: Employee|null = null;
  tasks: Task[];
  backToOverview;

  constructor(private taskService: TaskService,
              private employeeService: EmployeeService,
              private shiftService: ShiftService) { }

  ngOnInit() {

    this.backToOverview = this.shiftService.isShiftBeingUpdated();

    this.taskService.fetchTasksSubtasks().subscribe(tasks =>{
      this.tasks = tasks;
    });
  }

  addTask(usedLink){

    this.shiftService.shiftToAdd.taskName = usedLink.text;
    this.shiftService.shiftToAdd.shiftType = "subtask";
  }
}
