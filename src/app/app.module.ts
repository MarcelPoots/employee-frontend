import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {EmployeeService} from './employees/employee.service';
import {HeaderComponent} from './header/header.component';
import {EmployeesComponent} from './employees/employees.component';
import {ManagementComponent} from './management/management.component';
import {EmployeeComponent} from './employees/employee/employee.component';
import {EmployeeItemComponent} from './employees/employee/employee-item/employee-item.component';
import { HomeComponent } from './home/home.component';
import {AuthserviceService} from './authservice.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmployeesComponent,
    ManagementComponent,
    EmployeeComponent,
    EmployeeItemComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [EmployeeService, AuthserviceService],
  bootstrap: [AppComponent]
})
export class AppModule {}