import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomersComponent} from './components/customers/customers.component';
import {ReportsComponent} from './components/reports/reports.component';
import {TopCustomersComponent} from './components/reports/top-customers/top-customers.component';
import {CustomerFormComponent} from './components/customers/customer-form/customer-form.component';


const routes: Routes = [
  {path: '', component: CustomersComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'reports/top-customers', component: TopCustomersComponent},
  {path: 'customer/new', component: CustomerFormComponent},
  {path: 'customer/:id/update', component: CustomerFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
