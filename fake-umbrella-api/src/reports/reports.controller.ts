import {Controller, Get, Param} from '@nestjs/common';
import {Customer} from "../customers/interfaces/customer";
import {ReportsService} from "./reports.service";

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportService: ReportsService) {
    }

    @Get()
    findAllCustomers(): Promise<Customer[]> {
        return this.reportService.findAllCustomerWithForecast();
    }

    @Get('top-customers')
    findTopCustomers(): Promise<Customer[]> {
        return this.reportService.findTopCustomersWithForecast();
    }
}

