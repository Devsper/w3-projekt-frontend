import { Component, OnInit } from '@angular/core';

import { TaskService } from '../_services/task.service';
import { EmployeeService } from '../_services/employee.service';
import { Employee } from '../_models/employee';
import { Task } from '../_models/task';

@Component({
  selector: 'app-choose-task',
  templateUrl: './choose-task.component.html',
  styleUrls: ['./choose-task.component.scss']
})
export class ChooseTaskComponent implements OnInit {

  currentEmployee: Employee;
  tasks: Task[];

  constructor(private taskService: TaskService,
              private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.isEmployeeAllowed();
    this.currentEmployee = this.employeeService.getCurrentEmployee();

    this.taskService.getTasks().subscribe(data =>{
      this.tasks = data;
    });
  }

  onLogout(){
    this.employeeService.logout().subscribe();
  }
}
