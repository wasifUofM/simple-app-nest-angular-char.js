import {Controller, Get, Post, Put, Delete, Body, Param} from '@nestjs/common';
import {CustomerDto} from './dto/customer.dto';
import {CustomersService} from "./customers.service";
import {Customer} from "./interfaces/customer";

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {
    }

    @Get()
    findAll(): Promise<Customer[]> {
        return this.customersService.findAll();
    }

    @Get(':id')
    findCustomerById(@Param('id') id): Promise<Customer> {
        return this.customersService.findCustomerById(id);
    }

    @Post()
    createCustomer(@Body() createCustomerDto: CustomerDto): Promise<Customer> {
        return this.customersService.create(createCustomerDto);
    }

    @Delete(':id')
    deleteCustomer(@Param('id') id): Promise<Customer> {
        return this.customersService.delete(id);
    }

    @Put(':id')
    updateCustomer(@Body() updateCustomerDto: CustomerDto, @Param('id') id): Promise<Customer> {
        return this.customersService.update(id, updateCustomerDto);
    }
}
