import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Req,
  Res,
} from "@nestjs/common";
import { TradingService } from "./services/trading.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";

@Controller("api/trading")
@ApiTags("Trading")
export class TradingApiController {
  constructor(private tradingService: TradingService) {}

  @Get("prices")
  @ApiOperation({ summary: "Price List", description: "Get BTC prices" })
  @ApiResponse({ status: 200, description: "BTC prices fetched successfully" })
  async list(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.tradingService.getAll(req);
      if (result.success)
        return res.status(200).send({
          statusCode: 200,
          message: result.message,
          data: result.data,
        });
      return res
        .status(400)
        .send({ statusCode: 400, message: result.message, data: result.data });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
