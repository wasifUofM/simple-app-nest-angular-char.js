import {Controller, Get, Param} from '@nestjs/common';
import {Customer} from "../customers/interfaces/customer";
import {ReportsService} from "./reports.service";

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportService: ReportsService) {
    }

    @Get('top-customers')
    findTopCustomers(): Promise<Customer[]> {
        return this.reportService.findTopCustomers();
    }
}

