import {Component, OnInit} from '@angular/core';
import {Customer} from '../../../models/Customer';
import {CustomerService} from '../../../services/customer.service';
import {ReportsService} from '../../../services/reports.service';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.css']
})
export class AllCustomersComponent implements OnInit {
  customers: Customer[];
  customerWithForecast: Customer[] = [];
  companyLocations = new Set();

  constructor(private customerService: CustomerService, private reportService: ReportsService) {
  }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
      customers.forEach(customer => {
        this.companyLocations.add(customer.location.toLowerCase());
      });
      this.getCustomersWithRainForecast(this.companyLocations);
    });
  }

  getCustomersWithRainForecast(locations: Set<any>): void {
    this.reportService.getRainForecastForLocation(locations).then(response => {
        this.customers.forEach(customer => {
          if (this.hasRainForecast(response.get(customer.location.toLowerCase()))) {
            this.customerWithForecast.push(customer);
          }
        });
      }
    );
  }

  hasRainForecast(forecast: string): boolean {
    return forecast === 'Rain';
  }

}
