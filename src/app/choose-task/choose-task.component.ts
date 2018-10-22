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

  currentEmployee: Employee|null = null;
  tasks: Task[];

  constructor(private taskService: TaskService,
              private employeeService: EmployeeService) { }

  ngOnInit() {
    
    if(this.employeeService.currentEmployee){
      this.currentEmployee = this.employeeService.currentEmployee
    }else{
      this.employeeService.getCurrentEmployee().subscribe((employee) =>{
        this.currentEmployee = employee;
      });
    }

    this.taskService.getTasks().subscribe(data =>{
      this.tasks = data;
    });
  }

  onLogout(){
    this.employeeService.logout().subscribe();
  }
}
