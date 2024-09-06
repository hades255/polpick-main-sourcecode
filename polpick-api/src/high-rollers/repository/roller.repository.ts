import { InjectModel } from "@nestjs/mongoose";
import { AggregatePaginateModel, AggregatePaginateResult, Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import * as _ from 'underscore';
import { Request } from "express";
import { BaseRepository } from "src/common/base/base.repository";
import { Roller, RollerDoc } from "../schema/high-roller.schema";

@Injectable()
export class RollerRepo extends BaseRepository<Roller> {
    constructor(
        @InjectModel(Roller.name) private gameModel: Model<RollerDoc>,
        
        @InjectModel(Roller.name) private gameModelPaginate: AggregatePaginateModel<RollerDoc>,
    ) {
        super(gameModel, gameModelPaginate, );
    }
    async getRecent(): Promise<RollerDoc> {
        try {
            
            const lastData = await this.gameModel
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



