import {EmployeeService} from '../../employee.service';
import {Employee} from '../employee.model';
import {Component, OnInit, OnDestroy, Input, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-item',
  templateUrl: './employee-item.component.html',
  styleUrls: ['./employee-item.component.css']
})
export class EmployeeItemComponent implements OnInit, OnDestroy {
    
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex:number;
  editedItem:Employee;

  @Input() employee: Employee;
  deleted: string;

  constructor(private employeeService: EmployeeService) {}

  onClear() {
      this.slForm.reset();
      this.editMode = false;
    }

  onDelete() {
    this.employeeService.deleteEmployee(this.editedItemIndex).subscribe((response) => {
        console.log(response);
    });
    this.onClear();
  }  
    
  ngOnInit() {
    this.subscription = this.employeeService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.employeeService.getEmployee(index);
          this.slForm.setValue({
            firstname: this.editedItem.firstname,
            lastname: this.editedItem.lastname,
            gender: this.editedItem.gender
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newEmployee = new Employee(this.employeeService.listCount() * -1, '',value.firstname, value.lastname, value.gender);
    
    
    if (this.editMode) {
        console.log("EDITMODE " + value.firstname + ",  " + value.lastname);
        this.editedItem.firstname = value.firstname;
        this.editedItem.lastname  = value.lastname;
        this.editedItem.gender  = value.gender;
        this.employeeService.updatEmployee(this.editedItemIndex, this.editedItem).subscribe( (response) => {
          console.log(response);
        }) ;
    } else {
        console.log("NONE EDITMODE " + value.firstname + ",  " + value.lastname);

        this.employeeService.addEmployee(newEmployee).subscribe( (response) => {
          console.log(response);
        }) ;
    }
    this.editMode = false;
    form.reset();
  }
  
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
  

}
