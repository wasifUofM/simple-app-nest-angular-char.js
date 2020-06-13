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
  companyLocations = [];
  backGroundColor = [''];
  barChart = [];

  constructor(private reportService: ReportsService) {
  }

  ngOnInit(): void {
    this.reportService.getTopCustomers().subscribe(topCustomers => {
      topCustomers.forEach(customer => {
        this.companyName.push(customer.name + ' --- ' + customer.location.toLowerCase());
        this.numberOfEmployees.push(customer.num_of_employees);
        this.companyLocations.push(customer.location);
      });
      this.getWeatherForecast(this.companyLocations);
    });
  }

  getWeatherForecast(locations: string[]): void {
    this.reportService.getRainForecastForLocation(locations).then(response => {
        locations.forEach(location => {
          this.backGroundColor.push(this.hasRainForecast(response.get(location.toLowerCase())));
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

  hasRainForecast(forecast: string): string {
    return forecast === 'Rain' ? 'green' : 'red';
  }
}
