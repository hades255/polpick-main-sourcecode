import { Module } from '@nestjs/common';
import { TradingApiController } from './trading-api.controller';
import { TradingService } from './services/trading.service';

@Module({
    imports: [],
    controllers: [TradingApiController],
    providers: [TradingService],
    exports: [TradingService]
})
export class TradingModule { }