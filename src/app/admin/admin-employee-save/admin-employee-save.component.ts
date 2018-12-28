import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../_services/employee.service';
import { Employee } from '../../_models/employee';
import { log } from 'util';

@Component({
  selector: 'app-admin-employee-save',
  templateUrl: './admin-employee-save.component.html',
  styleUrls: ['./admin-employee-save.component.scss']
})
export class AdminEmployeeSaveComponent implements OnInit {

  employee: Employee;
  success: boolean = false;
  deleted: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private employeeService: EmployeeService) { }

  ngOnInit() {
    
    let employeeId = this.route.snapshot.paramMap.get("id");

    if(employeeId){
      this.employeeService.fetchSingleEmployee(employeeId).subscribe(employee => this.employee = employee);
    }
  }

  onSubmit(submittedForm, formType){

    if(submittedForm.valid && !this.deleted){

      let values = submittedForm.value;
      let saveEmployee = new Employee();

      // Adds values to new Employee to be created or updated
      saveEmployee.name = values.name;
      saveEmployee.username = values.username;
      saveEmployee.password = values.password;
      saveEmployee.employeeNr = values.employeeNr;

      if(formType == 'isEdit'){
        
        saveEmployee.id = values.id;
        this.employeeService.editEmployee(saveEmployee).subscribe(success => this.success = success);
      }else{
        this.employeeService.createEmployee(saveEmployee).subscribe(success => this.success = success);
      }
    }
  }

  onDelete(e){

    e.preventDefault();

    if (confirm('Är du säker att du vill ta bort anställd?')) {
      
      this.employeeService.deleteEmployee(this.employee.id).subscribe(deleted => this.deleted = deleted);
    } 
  }
}
