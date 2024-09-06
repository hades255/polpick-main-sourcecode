import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { InjectModel } from "@nestjs/mongoose";
import { AggregatePaginateModel, AggregatePaginateResult, FilterQuery, Model, PipelineStage } from "mongoose";
import * as moment from "moment";
import { ConfigService } from "@nestjs/config";
import { ChangellyDocument, ChangellyExchange } from "../schema/changelly-exchange.schema";

@Injectable()
export class ChangellyExchangeRepository extends BaseRepository<ChangellyDocument> {
    constructor(
        @InjectModel(ChangellyExchange.name) private TransactionHistoryModel: Model<ChangellyDocument>,
        @InjectModel(ChangellyExchange.name) private changellyAggregateModel: AggregatePaginateModel<ChangellyDocument>,
        private readonly configService: ConfigService
    ) {
        super(TransactionHistoryModel, changellyAggregateModel)
    }

    // async getCurrencies(body:any): Promise<ChangellyDocument> {
    //     try {
    //         return 
    //     } catch (error) {
    //         throw new InternalServerErrorException(error.message);
    //     }
    // }


   
}