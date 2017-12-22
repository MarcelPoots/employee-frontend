import {EmployeeService} from './employee.service';
import {Employee} from './employee/employee.model';
import {Component, OnInit} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  subscription: Subscription;
  employees: Employee[] = [];
  employee: Employee = this.employeeService.newEmployee();
  emp: Employee;

  constructor(private employeeService: EmployeeService, private http: HttpClient) {
  }
  
  ngOnInit() {
      this.subscription = this.employeeService.employeesChanged
      .subscribe(
        (employees: Employee[]) => {
          this.employees = employees;
        }
      );
      this.employeeService.loademployees();
        this.employees = this.employeeService.getEmployees();
  }

  onEditItem(index: number){
      this.employeeService.startedEditing.next(index);
  }
  
}
