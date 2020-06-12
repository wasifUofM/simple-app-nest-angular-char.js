import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../models/Customer';


@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  apiUrl = 'http://localhost:3000/reports/top-customers';
  weatherApiUrl = 'http://localhost:3000/rain';
  openWeatherNetwork = 'https://api.openweathermap.org/data/2.5/forecast?q=ottawa&cnt=1&appid=dd79e59cd0a3dd5174dc1d79f8808613';

  constructor(private http: HttpClient) {
  }

  getTopCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}`);
  }

  getWeatherReport(location: string) {
    const response = this.http.get(`${this.weatherApiUrl}`);
    return this.http.get(`${this.weatherApiUrl}`);

  }

  getRainForecast(location: string): boolean {
    return true;
  }
}
