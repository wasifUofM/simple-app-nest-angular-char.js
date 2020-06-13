import {Injectable} from '@nestjs/common';
import {Customer} from "./interfaces/customer";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from 'mongoose';

@Injectable()
export class CustomersService {

    constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) {
    }

    async findAll(): Promise<Customer[]> {
        return await this.customerModel.find();
    }

    async findCustomerById(id: string): Promise<Customer> {
        return await this.customerModel.find({_id: id});
    }

    async create(customer: Customer): Promise<Customer> {
        const newCustomer = new this.customerModel(customer);
        return newCustomer.save();
    }

    async delete(id: string): Promise<Customer> {
        return await this.customerModel.findByIdAndRemove(id);
    }

    async update(id: string, customer: Customer): Promise<Customer> {
        return await this.customerModel.findByIdAndUpdate(id, customer, {new: true});
    }
}
