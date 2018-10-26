import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { EmployeeService } from '../_services/employee.service';
import { Assignment } from '../_models/assignment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  authToken = localStorage.employeeToken;

  constructor(private http: HttpClient, 
              private employeeService: EmployeeService){ }

  private serverUrl = 'http://localhost/w3-projekt/app';

  fetchAssignments(){

    let getDataUrl = this.serverUrl+"/get_data.php";
    let postBody = {
      "getData": "employeeAssignments",
      "token": this.authToken,
      "employee_Id": this.employeeService.getCurrentEmployeeId()
    }

    return this.http.post(getDataUrl, postBody ,{
      observe: "response",
      headers: new HttpHeaders({"Content-Type": "application/json"}), 
      })
        .pipe(
          map((res: any) =>{
            
            let data = res.body.data;
            let assignments: Assignment[] = [];
             
            data.forEach((element) => {

              let assignment = new Assignment(element.name, (element.hasTasks === "True"), element.id);
              assignments.push(assignment);

            });

            return assignments;
          })
        );
  }
}
