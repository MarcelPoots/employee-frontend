import { Employee } from './employee/employee.model';
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';



import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class EmployeeService {
    
    headers = new HttpHeaders();
    employeesChanged = new Subject<Employee[]>();
    startedEditing = new Subject<number>();
    private employees: Employee[]

    constructor( private httpClient: HttpClient ) {
    }

    private setEmployees( employees: Employee[] ) {
        this.employees = employees;
        this.employeesChanged.next( this.employees.slice() );
    }

    public loademployees(){
        this.httpClient.get<Employee[]>( 'http://localhost:8080/user/employees', {
            observe: 'body',
            responseType: 'json'
        } ) .map(
            ( employees ) => {
                //console.log( employees );
                return employees; }
            )
            .subscribe(
            ( employees: Employee[] ) => {
                this.setEmployees( employees ); }
            );
    }
    
    public getEmployees() : Employee[]{
        return this.employees;
    }

    listCount(): number{
        return this.employees.length;
    }
    
    getEmployee(index: number) {
        return this.employees[index];
    }


    private handleError( error: Response | any ) {
        console.error( 'EmployeeService::handleError', error );
        return Observable.throw( error );
    }

    public updatEmployee(index: number, employee: Employee) {
        console.log( 'updatEmployee >>' + employee.firstname );
        const req = new HttpRequest('PUT', 'http://localhost:8080/user/employee', employee, {reportProgress: true});
        return this.httpClient.request(req);    
    }
    
    public addEmployee( employee: Employee ) {
        console.log( 'addEmployee ' + employee.firstname );
        this.employees.push(employee);
        this.employeesChanged.next( this.employees.slice() );
        const req = new HttpRequest('POST', 'http://localhost:8080/user/employee', employee, {reportProgress: true});
        return this.httpClient.request(req);    
    }

    deleteEmployee( index: number ) {
        var id: number = this.employees[index].id;
        this.employees.splice( index, 1 );
        this.employeesChanged.next( this.employees.slice() );
        const req = new HttpRequest('DELETE', 'http://localhost:8080/user/employee/'+ id,  {reportProgress: true});
        return this.httpClient.request(req);    
    }

    getNewId(): number {
        if (this.employees){
            return this.employees.length + 1 * -1;
        }else{
            return -1;
        }
    }
    
    newEmployee(): Employee {
        return new Employee(this.getNewId(), '', '', '', '' );
    }
}
