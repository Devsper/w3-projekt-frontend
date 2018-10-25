import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { registerLocaleData } from '@angular/common';
import localeSe from '@angular/common/locales/sv';

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
import { ShiftOverviewComponent } from './shift-overview/shift-overview.component';
import { ShiftSuccessComponent } from './shift-success/shift-success.component';

registerLocaleData(localeSe);

const routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginFormComponent},
  { path: 'user/shift/assignment', component: ChooseAssignmentComponent },
  { path: 'user/shift/subtask', component: ChooseTaskComponent },
  { path: 'user/shift/assignment/:id/datetime', component: ShiftDatetimeComponent },
  { path: 'user/shift/subtask/:id/datetime', component: ShiftDatetimeComponent },
  { path: 'user/shift/overview/:id', component: ShiftOverviewComponent },
  { path: 'user/shift/overview', component: ShiftOverviewComponent },
  { path: 'user/shift/success', component: ShiftSuccessComponent },
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
    ShiftDatetimeComponent,
    ShiftOverviewComponent,
    ShiftSuccessComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgxMyDatePickerModule.forRoot()
  ],
  providers: [TaskService, EmployeeService, AssignmentService, ShiftService, { provide: LOCALE_ID, useValue: 'sv'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
