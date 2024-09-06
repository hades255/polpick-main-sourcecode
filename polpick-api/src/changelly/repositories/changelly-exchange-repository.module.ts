import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  ChangellyExchange,
  ChangellySchema,
} from "../schema/changelly-exchange.schema";
import { ChangellyExchangeRepository } from "./changelly-exchange.repository";
import {
  ChangellyBuyTransactions,
  ChangellyBuyTransactionSchema,
} from "../schema/changelly-buy-transaction.schema";
import { ChangellyBuyTransactionRepository } from "./changelly-buy-transaction.repository";

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ChangellyBuyTransactions.name,
        schema: ChangellyBuyTransactionSchema,
      },
    ]),
    MongooseModule.forFeature([
      { name: ChangellyExchange.name, schema: ChangellySchema },
    ]),
  ],
  providers: [ChangellyExchangeRepository, ChangellyBuyTransactionRepository],
  exports: [ChangellyExchangeRepository, ChangellyBuyTransactionRepository],
})
export class ChangellyExchangeRepositoryModule {}
