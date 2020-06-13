import {Component, OnInit} from '@angular/core';
import {ReportsService} from '../../../services/reports.service';
import {Chart} from 'node_modules/chart.js';


@Component({
  selector: 'app-top-customers',
  templateUrl: './top-customers.component.html',
  styleUrls: ['./top-customers.component.css']
})
export class TopCustomersComponent implements OnInit {
  companyName = [''];
  numberOfEmployees = [0];
  backGroundColor = [''];
  barChart = [];
  locations = [];

  constructor(private reportService: ReportsService) {
  }

  ngOnInit(): void {
    this.reportService.getTopCustomers().subscribe(topCustomers => {
      topCustomers.forEach(customer => {
        this.companyName.push(customer.name + '---' + customer.location.toLowerCase());
        this.numberOfEmployees.push(customer.num_of_employees);
        this.locations.push(customer.location);
      });
      this.getRainForecast(this.locations);
    });
  }

  getRainForecast(locations: string[]): void {
    this.reportService.getRainForecastForLocation(locations).then(response => {
        locations.forEach(location => {
          this.backGroundColor.push(this.rainForecast(response.get(location.toLowerCase())));
        });
        this.drawBarChart();
      }
    );
  }

  drawBarChart(): void {
    this.barChart = new Chart('top-customers', {
      type: 'bar',
      data: {
        labels: this.companyName,
        datasets: [
          {
            data: this.numberOfEmployees,
            borderColor: '#3cba9f',
            backgroundColor: this.backGroundColor,
            fill: true
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
      }
    });
  }

  rainForecast(hasRainForecast: string): string {
    return hasRainForecast === 'Rain' ? 'green' : 'red';
  }
}
