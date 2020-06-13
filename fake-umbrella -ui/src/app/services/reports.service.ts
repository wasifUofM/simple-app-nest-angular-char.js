import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../models/Customer';
import config from '../config/keys';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  hasRainForeCast;
  rainForecastTime;
  topCustomersApiUrl = config.topCustomersApiUrl;
  weatherApiUrl = config.weatherApiUrl;
  weatherApiKey = config.weatherApiKey;
  rainForecast = [];


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

  async getRainForecastForLocation(locations: string[]): Promise<string[]> {
    locations.forEach(location => {
      this.http.get<any>(this.weatherApiUrl + location + this.weatherApiKey).subscribe(response => {
        console.log(response);
        this.rainForecast.push(response.list[0]['weather'][0]['main']);
      });
    });

    return await this.rainForecast;
  }
}
