import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../models/Customer';
import config from '../config/keys';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  weatherMap = new Map();

  constructor(private http: HttpClient) {
  }

  getTopCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${config.topCustomersApiUrl}`);
  }

  async getRainForecastForLocation(locations: string[]): Promise<Map<any, any>> {
    locations.forEach(location => {
      this.http.get<any>(config.weatherApiUrl + location.toLowerCase() + config.weatherApiKey).subscribe(response => {
        console.log(response);
        this.weatherMap.set(location.toLowerCase(), response.list[0]['weather'][0]['main']);
      });
    });
    return await this.weatherMap;
  }
}
