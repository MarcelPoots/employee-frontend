import {EmployeeService} from './employee.service';
import {Employee} from './employee/employee.model';
import {Component, OnInit} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';
import { PagerService } from '../_services/index'

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

  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];

  constructor(private employeeService: EmployeeService, 
              private http: HttpClient, 
              private pagerService: PagerService) {
  }
  
  ngOnInit() {
      this.subscription = this.employeeService.employeesChanged
      .subscribe(
        (employees: Employee[]) => {
          this.employees = employees;
          this.setPage(1);
        }
      );
      this.employeeService.loademployees();
      this.employees = this.employeeService.getEmployees();

  }

  onEditItem(employee : Employee){
     var i:number;
     var index: number
     for(i = 0; i < this.employees.length;i++) {
         if (employee.id === this.employees[i].id){
             index = i;
             break;
         }
     }
     this.employeeService.startedEditing.next(index);
  }
  
  setPage(page: number) {
      if (page < 1 || page > this.pager.totalPages) {
          return;
      }

      // get pager object from service
      this.pager = this.pagerService.getPager(this.employees.length, page);

      // get current page of items
      this.pagedItems = this.employees.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }  
}
