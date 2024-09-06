import { InjectModel } from "@nestjs/mongoose";
import {
  AggregatePaginateModel,
  AggregatePaginateResult,
  Model,
  PipelineStage,
} from "mongoose";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as _ from "underscore";
import { Request } from "express";
import { TradingPriceDocument, TradingPrice } from "../schemas/trading.schema";
import { BaseRepository } from "src/common/base/base.repository";
import { ApiResponseType } from "src/common/types/api-response.type";

@Injectable()
export class TradingRepository extends BaseRepository<TradingPriceDocument> {
  constructor(
    @InjectModel(TradingPrice.name)
    private TradingModel: Model<TradingPriceDocument>,
    @InjectModel(TradingPrice.name)
    private TradingModelPaginated: AggregatePaginateModel<TradingPriceDocument>
  ) {
    super(TradingModel, TradingModelPaginated);
  }

  async getPrice(req: Request): Promise<TradingPriceDocument[]> {
    try {
      const currentTime = Date.now();
      const fiveSecondsAgo = currentTime - 5000;

      const sortOperator: PipelineStage = { $sort: { time: -1 } };

      const prices = this.TradingModel.aggregate([
        // { $match: { T: { $gte: fiveSecondsAgo, $lte: currentTime } } },
        // { $match: { T: {$lte: fiveSecondsAgo } } },
        {
          $project: {
            _id: 0,
            value: "$p",
            time: "$T",
          },
        },
        sortOperator,
        { $limit: 300 },
      ]);
      return prices;
    } catch (error) {
      return error;
    }
  }




  // async getPrice(req: Request): Promise<TradingPriceDocument[]> {
  //   try {
  //     const currentTime = Date.now();
  //     const fiveSecondsAgo = currentTime - 5000;
  
  //     const matchOperator: PipelineStage = { $match: { T: { $gte: fiveSecondsAgo, $lte: currentTime } } };
  //     const sortOperator: PipelineStage = { $sort: { T: -1 } };
  
  //     const batchSize = 300;
  //     let prices: TradingPriceDocument[] = [];
  //     let skip = 0;
  //     let batch: TradingPriceDocument[];
  
  //     do {
  //       batch = await this.TradingModel.aggregate([
  //         matchOperator,
  //         {
  //           $project: {
  //             _id: 0,
  //             value: "$p",
  //             time: "$T",
  //           },
  //         },
  //         sortOperator,
  //         { $skip: skip },
  //         { $limit: batchSize },
  //       ]).exec();
  
  //       prices = prices.concat(batch);
  //       skip += batchSize;
  //     } while (batch.length === batchSize);
  
  //     return prices;
  //   } catch (error) {
  //     throw new Error(`Error fetching prices: ${error.message}`);
  //   }
  // }


}
