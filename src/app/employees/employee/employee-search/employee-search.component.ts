import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../employee.service';
import { Employee } from '../employee.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent implements OnInit {

  constructor(private employeeService: EmployeeService) {}

  subscription: Subscription;
  param: string = 'Some text';
  searchEmployees : Employee[];
  allEmployees : Employee[];
  
  ngOnInit() {
      this.subscription = this.employeeService.employeesChanged
      .subscribe(
        (employees: Employee[]) => {
          this.allEmployees = employees;
        }
      );
  }

  onSearch(param: string){
      if (param === ''){
          this.employeeService.loademployees();
      }else{
          console.log('searched for ' + param);
          this.searchEmployees = new Array<Employee>();
          for(let emp of this.allEmployees){
              if (emp.firstname.toUpperCase().search(param.toUpperCase()) > -1 || 
                      emp.lastname.toUpperCase().search(param.toUpperCase()) > -1){
                  console.log('' + emp.firstname + ' ' + emp.lastname);
                  this.searchEmployees.push(emp);
              }
          }
          this.employeeService.setEmployees(this.searchEmployees);
      }
  }
}
