import {Component, OnInit} from '@angular/core';
import {Customer} from '../../models/Customer';
import {CustomerService} from '../../services/customer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Customer[];

  constructor(private customerService: CustomerService, private router: Router) {
  }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
    });
  }

  onClickEdit(customer: Customer): void {
    this.router.navigate(['customer', customer._id, 'edit']);
  }

  onClickDelete(customer: Customer): void {
    this.customerService.deleteCustomer(customer._id).subscribe(customer => {
        this.customers = this.customers.filter(t => t._id !== customer._id);
      }
    );
  }
}
