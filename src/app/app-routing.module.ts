import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { ManagementComponent } from './management/management.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'employees', component: EmployeesComponent},
  { path: 'management', component: ManagementComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}