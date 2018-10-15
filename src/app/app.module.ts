import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';

import { TaskService } from './_services/task.service';
import { UserService } from './_services/user.service';
import { LoginFormComponent } from './login-form/login-form.component';
import { MainComponent } from './main/main.component';

const routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginFormComponent},
  { path: 'user', component: MainComponent },
  { path: 'tasks', component: TasksComponent},
  { path: 'tasks/:id/test/:id2', component: TasksComponent},
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    LoginFormComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [TaskService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
