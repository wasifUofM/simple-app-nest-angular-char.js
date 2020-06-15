import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import {MongooseModule} from "@nestjs/mongoose";
import {CustomerSchema} from "../customers/schemas/customer.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Customer', schema: CustomerSchema}])],
    controllers: [ReportsController],
    providers: [ReportsService],
})
export class ReportsModule {}
