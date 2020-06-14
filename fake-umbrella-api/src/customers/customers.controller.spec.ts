import {Test} from '@nestjs/testing';
import * as request from 'supertest';
import {CustomersModule} from './customers.module';
import {CustomersService} from './customers.service';
import {INestApplication} from "@nestjs/common";

describe('Customer Controller', () => {
    let app: INestApplication;
    const customerService = {findAll: () => ['test']};

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [CustomersModule],
        })
            .overrideProvider(CustomersService)
            .useValue(customerService)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`/GET customers`, () => {
        return request(app.getHttpServer())
            .get('/customers')
            .expect(200)
            .expect({
                data: customerService.findAll(),
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
