import { Body, Controller, Get, HttpStatus, InternalServerErrorException, Param, Post, Req, Res } from "@nestjs/common";
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { OrderService } from "./service/order.service";
import { OrderTransactionListDto } from "./dto/order.dto";



@Controller('api/order')
@ApiTags('Order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
    ) { }

    /* Fetches the games history listing from the database */
    @Post('list')
    @ApiOperation({ summary: "Orders History", description: "User Order Transactions History" })
    @ApiResponse({ status: 200, description: 'User transaction history fetched successfully.' })
    async listGameHistory(@Body() dto: OrderTransactionListDto, @Res() res: Response) {
        try {
            let result = await this.orderService.transactionHistory(dto);
            return res.status(HttpStatus.OK).send({ statusCode: 200, ...result });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}