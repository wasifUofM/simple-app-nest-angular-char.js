import {Injectable} from '@nestjs/common';
import {Customer} from "../customers/interfaces/customer";
import {Model} from 'mongoose';
import {InjectModel} from "@nestjs/mongoose";
import config from '../config/keys'

@Injectable()
export class ReportsService {
    constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) {
    }

    async findTopCustomers(): Promise<Customer[]> {
        return await this.customerModel.find().sort({num_of_employees: 'desc'}).limit(config.top_k_customer);
    }
}
