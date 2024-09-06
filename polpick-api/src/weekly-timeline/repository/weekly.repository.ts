import { InjectModel } from "@nestjs/mongoose";
import { AggregatePaginateModel, AggregatePaginateResult, Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import * as _ from 'underscore';
import { Request } from "express";
import { BaseRepository } from "src/common/base/base.repository";
import { Weekly, WeeklyDoc } from "../schema/weekly.schema";


@Injectable()
export class WeeklyRepo extends BaseRepository<Weekly> {
    constructor(
        @InjectModel(Weekly.name) private WeeklyModel: Model<WeeklyDoc>,
        
        @InjectModel(Weekly.name) private WeeklyModelPaginate: AggregatePaginateModel<WeeklyDoc>,
    ) {
        super(WeeklyModel, WeeklyModelPaginate, );
    }
    async getRecent(): Promise<WeeklyDoc> {
        try {
            
            const lastData = await this.WeeklyModel
                .findOne()
                .sort({ total_trade: -1 })
                .limit(10)
                .exec();

            return lastData;
        } catch (error) {
            throw new Error(`Failed to retrieve last saved data: ${error}`);
        }
    }

    

    
    }



