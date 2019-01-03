import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-start',
  templateUrl: './admin-start.component.html',
  styleUrls: ['./admin-start.component.scss']
})
export class AdminStartComponent implements OnInit {

  constructor(private router: Router) { }
  
  // Execute code when component initates
  ngOnInit() {

    // Authorizes employee. Not a secure way to authorize administrator
    if(localStorage.employeeAdmin == 'N'){
      this.router.navigate(['user/shift/assignments']);
    }
  }

}
