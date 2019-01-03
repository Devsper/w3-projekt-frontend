import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';

import { EmployeeService } from '../../_services/employee.service';
import { Employee } from '../../_models/employee';

@Component({
  selector: 'app-admin-employee-save',
  templateUrl: './admin-employee-save.component.html',
  styleUrls: ['./admin-employee-save.component.scss']
})
export class AdminEmployeeSaveComponent implements OnInit {

  employee: Employee;
  success: boolean = false;
  deleted: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private employeeService: EmployeeService) { }
  
  // Execute code when component initates
  ngOnInit() {

    // Authorizes employee. Not a secure way to authorize administrator
    if(localStorage.employeeAdmin == 'N'){
      this.router.navigate(['user/shift/assignments']);
    }
    
    // Fetches employee id from URL
    let employeeId = this.route.snapshot.paramMap.get("id");

    // Fetch employee if id is present
    if(employeeId){
      this.employeeService.fetchSingleEmployee(employeeId).subscribe(employee => this.employee = employee);
    }
  }

  /**
   * Attempts to submit form to service
   * @param {NgForm} submittedForm - Form that has been submitted
   * @param {string} formType - Which form that has been submitted
   * @memberof AdminEmployeeSaveComponent
   */
  onSubmit(submittedForm: NgForm, formType: string){

    if(submittedForm.valid && !this.deleted){

      let values = submittedForm.value;
      let saveEmployee = new Employee();

      // Adds values to new Employee to be created or updated
      saveEmployee.name = values.name;
      saveEmployee.username = values.username;
      saveEmployee.password = values.password;
      saveEmployee.employeeNr = values.employeeNr;

      if(formType == 'isEdit'){
        // Updates employee
        saveEmployee.id = values.id;
        this.employeeService.editEmployee(saveEmployee).subscribe(success => this.success = success);
      }else{
        // Creates employee
        this.employeeService.createEmployee(saveEmployee).subscribe(success => this.success = success);
      }
    }
  }

  /**
   * Attempts to delete employee 
   * @param {MouseEvent} e - Click event
   * @memberof AdminEmployeeSaveComponent
   */
  onDelete(e){

    // Prevents submission of form
    e.preventDefault();

    if (confirm('Är du säker att du vill ta bort anställd?')) {
      
      this.employeeService.deleteEmployee(this.employee.id).subscribe(deleted => this.deleted = deleted);
    } 
  }
}
