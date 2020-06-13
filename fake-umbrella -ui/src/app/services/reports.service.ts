import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../models/Customer';
import config from '../config/keys';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  topCustomersApiUrl = config.topCustomersApiUrl;
  weatherApiUrl = config.weatherApiUrl;
  weatherApiKey = config.weatherApiKey;
  weatherMap = new Map();


  constructor(private http: HttpClient) {
  }

  getTopCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.topCustomersApiUrl}`);
  }

  async getRainForecastForLocation(locations: string[]): Promise<Map<any, any>> {
    locations.forEach(location => {
      this.http.get<any>(this.weatherApiUrl + location + this.weatherApiKey).subscribe(response => {
        console.log(response);
        this.weatherMap.set(location.toLowerCase(), response.list[0]['weather'][0]['main']);
      });
    });
    return await this.weatherMap;
  }
}
