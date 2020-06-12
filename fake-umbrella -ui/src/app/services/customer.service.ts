import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../models/Customer';

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

  apiUrl = 'http://localhost:3000/customers';
  topLimit = '?_limit=5';

  constructor(private http: HttpClient) {
  }
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}${this.topLimit}`);

  }
  addCustomer(todo: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, todo, httpOptions);
  }
}
