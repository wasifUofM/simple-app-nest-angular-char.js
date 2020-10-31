import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './components/customers/customers.component';
import {FormsModule} from '@angular/forms';
import { ReportsComponent } from './components/reports/reports.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { TopCustomersComponent } from './components/reports/top-customers/top-customers.component';
import { AllCustomersComponent } from './components/reports/all-customers/all-customers.component';
import { CustomerFormComponent } from './components/customers/customer-form/customer-form.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    ReportsComponent,
    HeaderComponent,
    TopCustomersComponent,
    AllCustomersComponent,
    CustomerFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
