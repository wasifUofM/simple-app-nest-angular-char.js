import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import { HttpModule } from '@nestjs/common';
import {CustomersController} from './customers/customers.controller';
import {CustomersService} from './customers/customers.service';
import {CustomersModule} from "./customers/customers.module";
import config from './config/keys';
import {CustomerSchema} from './customers/schemas/customer.schema';
import { ReportsController } from './reports/reports.controller';
import { ReportsService } from './reports/reports.service';
import { ReportsModule } from './reports/reports.module';

@Module({
    imports: [CustomersModule, MongooseModule.forRoot(config.mongoURI), MongooseModule.forFeature([{name: 'Customer', schema: CustomerSchema}]), HttpModule, ReportsModule],
    controllers: [AppController, CustomersController, ReportsController],
    providers: [AppService, CustomersService, ReportsService],
})
export class AppModule {
}
