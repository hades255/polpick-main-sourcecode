import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { Transaction, TransactionDocument } from "../schemas/transactions.schema";
import { InjectModel } from "@nestjs/mongoose";
import { AggregatePaginateModel, Model } from "mongoose";

@Injectable()
export class TransactionRepository extends BaseRepository<TransactionDocument> {
    constructor(
        @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
        @InjectModel(Transaction.name) private transactionAggregateModel: AggregatePaginateModel<TransactionDocument>,
    ) {
        super(transactionModel, transactionAggregateModel)
    }
}