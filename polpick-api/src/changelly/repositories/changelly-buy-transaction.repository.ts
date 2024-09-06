import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { InjectModel } from "@nestjs/mongoose";
import { AggregatePaginateModel, AggregatePaginateResult, FilterQuery, Model, PipelineStage } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { ChangellyBuyTransactionDocument, ChangellyBuyTransactions } from "../schema/changelly-buy-transaction.schema";

@Injectable()
export class ChangellyBuyTransactionRepository extends BaseRepository<ChangellyBuyTransactionDocument> {
    constructor(
        @InjectModel(ChangellyBuyTransactions.name) private TransactionHistoryModel: Model<ChangellyBuyTransactionDocument>,
        @InjectModel(ChangellyBuyTransactions.name) private changellyAggregateModel: AggregatePaginateModel<ChangellyBuyTransactionDocument>,
        private readonly configService: ConfigService
    ) {
        super(TransactionHistoryModel, changellyAggregateModel)
    }
   
}