import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  hasRainForeCast;
  rainForecastTime;
  topCustomersApiUrl = 'http://localhost:3000/reports/top-customers';
  weatherApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
  weatherApiKey = '&cnt=1&appid=dd79e59cd0a3dd5174dc1d79f8808613';

  constructor(private http: HttpClient) {
  }

  getTopCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.topCustomersApiUrl}`);
  }

  getRainForecast(location: string): boolean {
    this.http.get<any>(this.weatherApiUrl + location + this.weatherApiKey).subscribe(response => {
      console.log(response);
      this.hasRainForeCast = response.list[0]['weather'][0]['main'] === 'Rain';
      this.rainForecastTime = response.list[0]['dt_txt'];
    });
    return this.hasRainForeCast;
  }
}
