import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../models/Customer';
import config from '../config/keys';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = config.customersApiUrl;
  constructor(private http: HttpClient) {
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  addCustomer(todo: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, todo, httpOptions);
  }

  getCustomer(id: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/${id}`, httpOptions);
  }

  updateCustomer(id: string, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${id}`, customer, httpOptions);
  }

  deleteCustomer(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }
}
