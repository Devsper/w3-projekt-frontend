import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { registerLocaleData } from '@angular/common';
import localeSe from '@angular/common/locales/sv';

import { AppComponent } from './app.component';
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
import { HeaderComponent } from './header/header.component';
import { EditSettingsComponent } from './edit-settings/edit-settings.component';

registerLocaleData(localeSe);

const routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginFormComponent},
  { path: 'user/shift/assignments', component: ChooseAssignmentComponent },
  { path: 'user/shift/subtasks', component: ChooseTaskComponent },
  { path: 'user/shift/assignments/:id/datetime', component: ShiftDatetimeComponent },
  { path: 'user/shift/subtasks/:id/datetime', component: ShiftDatetimeComponent },
  { path: 'user/shift/overview/new', component: ShiftOverviewComponent },
  { path: 'user/shift/overview/:id', component: ShiftOverviewComponent },
  { path: 'user/shift/overview', component: ShiftOverviewComponent },
  { path: 'user/shift/success', component: ShiftSuccessComponent },
  { path: 'user/edit/assignments', component: EditSettingsComponent },
  { path: 'user/edit/tasks', component: EditSettingsComponent },
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    MainComponent,
    ChooseAssignmentComponent,
    ChooseTaskComponent,
    ShiftDatetimeComponent,
    ShiftOverviewComponent,
    ShiftSuccessComponent,
    HeaderComponent,
    EditSettingsComponent
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
