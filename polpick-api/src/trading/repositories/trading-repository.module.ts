import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TradingPrice, tradingSchema } from "../schemas/trading.schema";
import { TradingRepository } from "./trading.repository";

@Global()
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: TradingPrice.name,
        useFactory: () => {
          return tradingSchema;
        },
      },
    ]),
  ],
  exports: [TradingRepository],
  providers: [TradingRepository],
})
export class TradingRepositoryModule {}
