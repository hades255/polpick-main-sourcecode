import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Req,
  Res,
  UsePipes,
} from "@nestjs/common";
import { Response } from "express";
import { ChangellyDto, ChangellyPayDto, ChangellyPayOfferDto } from "./dto/changelly.dto";
import { ChangellyService } from "./changelly.service";
import { ApiConsumes } from "@nestjs/swagger";
import _ from "underscore";

@Controller("api/changelly")
export class ChangellyApiController {
  constructor(private readonly changellyService: ChangellyService) {}

  @Post("get-currencies")
  @ApiConsumes("application/json")
  async getCurrencies(@Body() body: ChangellyDto, @Res() res: Response) {
    try {
      const result = await this.changellyService.getCurrencies(body);
      if (result) return res.status(HttpStatus.OK).send(result);
      return res.status(HttpStatus.BAD_REQUEST).send(result);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post("get-currencies-all")
  @ApiConsumes("application/json")
  async getCurrenciesFull(@Body() body: ChangellyDto, @Res() res: Response) {
    try {
      console.log("/getCurrenciesAll");
      const result = await this.changellyService.getCurrenciesFull(body);
      if (result) return res.status(HttpStatus.OK).send(result);
      return res.status(HttpStatus.BAD_REQUEST).send(result);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post("get-pairs")
  @ApiConsumes("application/json")
  async getCurrenciesAll(@Body() body: ChangellyDto, @Res() res: Response) {
    try {
      console.log("/getCurrenciesAll");
      const result = await this.changellyService.getPairs(body);
      if (result) return res.status(HttpStatus.OK).send(result);
      return res.status(HttpStatus.BAD_REQUEST).send(result);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post("get-min-amount")
  @ApiConsumes("application/json")
  async getMinAmount(@Body() body: ChangellyDto, @Res() res: Response) {
    try {
      console.log("/getMinAmount");
      const result = await this.changellyService.getMinAmount(body);
      if (result) return res.status(HttpStatus.OK).send(result);
      return res.status(HttpStatus.BAD_REQUEST).send(result);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post("get-pair-params")
  @ApiConsumes("application/json")
  async getPairsParams(@Body() body: ChangellyDto, @Res() res: Response) {
    try {
      const result = await this.changellyService.getPairsParams(body);
      if (result) return res.status(HttpStatus.OK).send(result);
      return res.status(HttpStatus.BAD_REQUEST).send(result);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post("get-exchange-amount")
  @ApiConsumes("application/json")
  async getExchangeAmount(@Body() body: ChangellyDto, @Res() res: Response) {
    try {
      console.log("/getExchangeAmount");
      const result = await this.changellyService.getExchangeAmount(body);
      if (result) return res.status(HttpStatus.OK).send(result);
      return res.status(HttpStatus.BAD_REQUEST).send(result);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post("create-transaction")
  @ApiConsumes("application/json")
  async createTransaction(@Body() body: ChangellyDto, @Res() res: Response) {
    try {
      console.log("/createTransaction");
      const result = await this.changellyService.createTransaction(body);
      if (result) return res.status(HttpStatus.OK).send(result);
      return res.status(HttpStatus.BAD_REQUEST).send(result);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post("get-fixed-rate-amount")
  @ApiConsumes("application/json")
  async getFixRateForAmount(@Body() body: ChangellyDto, @Res() res: Response) {
    try {
      console.log("/getFixRateForAmount");
      const result = await this.changellyService.getFixedRateAmount(body);
      if (result) return res.status(HttpStatus.OK).send(result);
      return res.status(HttpStatus.BAD_REQUEST).send(result);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get("changelly-available-providers")
  @ApiConsumes("application/json")
  async changellyAvailableProviders(@Req() req: Request, @Res() res: Response) {
    try {
      const resp = await this.changellyService.getChangellyAvailableProviders();
      if (!_.isEmpty(resp) && resp.status === 200) return res.status(HttpStatus.OK).send(resp);
      return res.status(HttpStatus.BAD_REQUEST).send(resp);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get("changelly-availability-countries")
  @ApiConsumes("application/json")
  async changellyAvailabilityCountries(@Req() req: Request, @Res() res: Response) {
    try {
      const resp = await this.changellyService.getChangellyAvailabilityCountries();
      // console.log("changelly-availability-countries", resp);
      if (!_.isEmpty(resp) && resp.status === 200) return res.status(HttpStatus.OK).send(resp);
      return res.status(HttpStatus.BAD_REQUEST).send(resp);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post("changelly-pay-Offers")
  @ApiConsumes("application/json")
  async getChangellyOffers(@Body() body: ChangellyPayOfferDto, @Res() res: Response) {
    try {
      const resp = await this.changellyService.getChangellyOffers(body);
      if (!_.isEmpty(resp) && resp.status === 200) return res.status(HttpStatus.OK).send(resp);
      return res.status(HttpStatus.BAD_REQUEST).send(resp);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }


  @Post("create-changelly-pay-payment")
  @ApiConsumes("application/json")
  async createChangellyPayPayment(@Body() body: ChangellyPayDto, @Res() res: Response) {
    try {
      const resp = await this.changellyService.createChangellyPayPayment(body);
      if (resp.status === 201) {
        return res.status(HttpStatus.OK).send(resp);
      }
      return res.status(HttpStatus.BAD_REQUEST).send(resp);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post("changelly-pay-payment-callback")
  @ApiConsumes("application/json")
  async changellyPayPaymentCallback(@Req() req: any, @Res() res: Response) {
    try {
      const resp =
        await this.changellyService.changellyPayPaymentCallBack(req,res);
      if (resp.status === 200) {
        return res.status(HttpStatus.OK).send(resp);
      }
      return res.status(HttpStatus.BAD_REQUEST).send(resp);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
