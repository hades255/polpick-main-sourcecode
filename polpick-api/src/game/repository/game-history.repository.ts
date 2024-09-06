import { InjectModel } from "@nestjs/mongoose";
import { AggregatePaginateModel, Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import * as _ from 'underscore';
import { BaseRepository } from "src/common/base/base.repository";
import { GameHistory, GameHistoryDocument } from "../schemas/game-history.schema";

@Injectable()
export class GameHistoryRepository extends BaseRepository<GameHistoryDocument> {
  constructor(
    @InjectModel(GameHistory.name) private gameHistoryModel: Model<GameHistoryDocument>,
    @InjectModel(GameHistory.name) private gameHistoryAggregateModel: AggregatePaginateModel<GameHistoryDocument>,
  ) {
    super(gameHistoryModel, gameHistoryAggregateModel);
  }

}