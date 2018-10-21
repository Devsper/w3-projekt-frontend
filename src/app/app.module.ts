import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MainComponent } from './main/main.component';

import { TaskService } from './_services/task.service';
import { EmployeeService } from './_services/employee.service';
import { ChooseAssignmentComponent } from './choose-assignment/choose-assignment.component';
import { ChooseTaskComponent } from './choose-task/choose-task.component';


const routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginFormComponent},
  { path: 'user/choose-assignment', component: ChooseAssignmentComponent },
  { path: 'user/choose-task', component: ChooseTaskComponent },
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
    ChooseTaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [TaskService, EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
