import { Body, Controller, Get, InternalServerErrorException, Post, Req, Res } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { WeeklyService } from "./service/weekly.service";
import { WeeklyJackpotHistoryListDto, WeeklyJackpotListDto } from "./dto/weekly.dto";


@Controller('api/weekly')
@ApiTags('Weekly')
export class WeeklyController {
    constructor(
        private weeklyService: WeeklyService,
    ) { }

    /* Weekly Winners History API */
    @Post('list')
    @ApiOperation({ summary: "Weekly Winner List", description: "Get Weekly Winners History API" })
    @ApiResponse({ status: 200, description: 'Weekly winners history fetched successfully.' })
    async weeklyWinnersListing(@Body() dto: WeeklyJackpotHistoryListDto, @Res() res: Response) {
        try {
            let result = await this.weeklyService.getWeeklyWinnersListing(dto);
            if (result.success) return res.status(200).send({ statusCode: 200, ...result });
            return res.status(400).send({ statusCode: 400, ...result });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    /* Gets Weekly Jackpot Listing API */
    @Post('jackpot-list')
    @ApiOperation({ summary: "Weekly Jackpot List", description: "Get Weekly Jackpot Users List" })
    @ApiResponse({ status: 200, description: 'Weekly jackpot listing fetched successfully.' })
    async weeklyJackpotList(@Body() dto: WeeklyJackpotListDto, @Res() res: Response) {
        try {
            let result = await this.weeklyService.getWeeklyJackpotList(dto);
            if (result.success) return res.status(200).send({ statusCode: 200, ...result });
            return res.status(400).send({ statusCode: 400, ...result });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    /* Gets Weekly Jackpot Stats For Dashboard API */
    @Get('jackpot-stats')
    @ApiOperation({ summary: "Weekly Jackpot Stats", description: "Get Weekly Jackpot Stats For Dashboard" })
    @ApiResponse({ status: 200, description: 'Weekly jackpot stats fetched successfully.' })
    async weeklyJackpotStats(@Res() res: Response) {
        try {
            let result = await this.weeklyService.getWeeklyJackpotStats();
            if (result.success) return res.status(200).send({ statusCode: 200, ...result });
            return res.status(400).send({ statusCode: 400, ...result });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}