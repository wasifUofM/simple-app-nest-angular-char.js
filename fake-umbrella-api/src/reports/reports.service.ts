import {Injectable} from '@nestjs/common';
import {Customer} from "../customers/interfaces/customer";
import {Model} from 'mongoose';
import {InjectModel} from "@nestjs/mongoose";
import {HttpService} from '@nestjs/common';
import config from '../config/keys'
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import Any = jasmine.Any;

@Injectable()
export class ReportsService {
    constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>, private http: HttpService) {
    }

    private readonly weatherApiUrl: string = config.weatherApiUrl;
    private readonly weatherApiKey: string = config.weatherApiKey;
    apiResponse: Observable<Any>;

    async findTopCustomersWithForecast(): Promise<Customer[]> {
        return await this.customerModel.find().sort({num_of_employees: 'desc'}).limit(config.top_k_customer);
    }

    async findAllCustomerWithForecast(): Promise<Customer[]> {
        return await this.customerModel.find();
    }

    getWeatherReport(location: string): Observable<Any> {

        this.apiResponse = this.http.get(this.weatherApiUrl + location + this.weatherApiKey).pipe(
            map(response => response.data.list[0]
            ),
        );
        return this.apiResponse;
    }

    getRainForecast(location: string): Observable<Any> {

        this.apiResponse = this.http.get(this.weatherApiUrl + location + this.weatherApiKey).pipe(
            map(response => response.data.list[0]['weather'][0]['main']
            ),
        );
        return this.apiResponse;
    }
}
