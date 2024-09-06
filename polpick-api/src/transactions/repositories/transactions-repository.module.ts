import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Transaction, TransactionSchema } from "../schemas/transactions.schema";
import { TransactionRepository } from "./transactions.repository";

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }])
    ],
    providers: [TransactionRepository],
    exports: [TransactionRepository]
})
export class TransactionRepositoryModule {}