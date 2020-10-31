import {TestBed, getTestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CustomerService} from './customer.service';
import {Customer} from '../models/Customer';
import config from '../config/keys';

const dummyCustomerListResponse: Customer[] = [
  {
    '_id': '1222',
    'name': 'Sap',
    'contact_person': 'Ninja',
    'telephone_num': '3131',
    'location': 'ottawa',
    'num_of_employees': 300
  },
  {
    '_id': '122ee',
    'name': 'Oracle',
    'contact_person': 'Rest',
    'telephone_num': '31331',
    'location': 'Toronto',
    'num_of_employees': 100
  },
];

const singleCustomerData: Customer[] = [
  {
    '_id': '1222',
    'name': 'Sap',
    'contact_person': 'Ninja',
    'telephone_num': '3131',
    'location': 'ottawa',
    'num_of_employees': 300
  },
];

describe('CustomerService', () => {
  let injector: TestBed;
  let service: CustomerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService],
    });

    injector = getTestBed();
    service = injector.get(CustomerService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getCustomers() should return customers', () => {
    service.getCustomers().subscribe((res) => {
      expect(res).toEqual(dummyCustomerListResponse);
    });

    const req = httpMock.expectOne(config.customersApiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCustomerListResponse);
  });

  it('getCustomer(id) should return a customer', () => {
    service.getCustomer('123').subscribe((res) => {
      expect(res).toEqual(singleCustomerData);
    });

    const req = httpMock.expectOne(config.customersApiUrl + '/123');
    expect(req.request.method).toBe('GET');
    req.flush(singleCustomerData);
  });
});
