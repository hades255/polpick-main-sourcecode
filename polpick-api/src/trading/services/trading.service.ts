import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Request } from "express";
import * as _ from "underscore";
import { TradingRepository } from "../repositories/trading.repository";
import { ApiResponseType } from "src/common/types/api-response.type";

@Injectable()
export class TradingService {
  constructor(private tradingRepo: TradingRepository) {}

  async getAll(req: Request): Promise<ApiResponseType> {
    try {
      const resp = await this.tradingRepo.getPrice(req);
      return {
        success: true,
        data: resp,
        message: `Data fetched successfully.`,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
