import { Logger, Module } from '@nestjs/common';

import { HelperService } from 'src/helpers/game.helper';
import { OrderController } from './order-api.controller';
import { OrderService } from './service/order.service';


@Module({
    imports: [],
    controllers: [OrderController],
    providers: [OrderService, HelperService, Logger],
    exports: []
})
export class OrderModule { }
