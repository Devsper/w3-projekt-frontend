import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MainComponent } from './main/main.component';
import { ChooseAssignmentComponent } from './choose-assignment/choose-assignment.component';
import { ChooseTaskComponent } from './choose-task/choose-task.component';

import { TaskService } from './_services/task.service';
import { EmployeeService } from './_services/employee.service';
import { AssignmentService } from './_services/assignment.service';
import { ShiftService } from './_services/shift.service';
import { ShiftDatetimeComponent } from './shift-datetime/shift-datetime.component';

import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

const routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginFormComponent},
  { path: 'user/shift/assignment', component: ChooseAssignmentComponent },
  { path: 'user/shift/task', component: ChooseTaskComponent },
  { path: 'user/shift/assignment/:id/datetime', component: ShiftDatetimeComponent },
  { path: 'user/shift/subtask/:id/datetime', component: ShiftDatetimeComponent },
  { path: 'tasks', component: TasksComponent},
  { path: 'tasks/:id/subtask/:id2', component: TasksComponent},
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    LoginFormComponent,
    MainComponent,
    ChooseAssignmentComponent,
    ChooseTaskComponent,
    ShiftDatetimeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgxMyDatePickerModule.forRoot()
  ],
  providers: [TaskService, EmployeeService, AssignmentService, ShiftService],
  bootstrap: [AppComponent]
})
export class AppModule { }
