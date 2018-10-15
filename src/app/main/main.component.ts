import { Component, OnInit } from '@angular/core';

import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.isUserAllowed();
  }

  onLogout(){
    this.userService.logout();
  }
}
