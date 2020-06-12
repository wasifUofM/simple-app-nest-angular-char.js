import {Controller, Get, Param} from '@nestjs/common';
import {Customer} from "../customers/interfaces/customer";
import {ReportsService} from "./reports.service";
import {Observable} from "rxjs";

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

    @Get('weather/:location')
    findWeatherReport(@Param('location')location) {
        return this.reportService.getWeatherReport(location);
    }

    @Get('rain/:location')
    findRainForecast(@Param('location')location): Promise<string> {
        return location;
       // return this.reportService.getRainForecast(location);
    }
}

