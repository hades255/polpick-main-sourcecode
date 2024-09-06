import { Body, Controller, Get, HttpStatus, InternalServerErrorException, Param, Post, Query, Req, Res, UsePipes } from "@nestjs/common";
import { ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { GameService } from "./service/game-history.service";
import { GameListPaginatedDto, GameResultDto, WinRatioListDto, WinRationById } from "./dto/dto.game";

@Controller('api/game')
@ApiTags('Game')
export class GameController {
    constructor(
        private gameService: GameService,
    ) { }

    /* Api used to reset the users listing from polpick-game server */
    // Todo Add JWT Auth After Testing
    @Get('reset-game/:poolId')
    @ApiExcludeEndpoint()
    async gameReset(@Param('poolId') poolId: string, @Res() res: Response) {
        try {
            let result = await this.gameService.resetGame(poolId);
            if (result.success) return res.status(HttpStatus.OK).send(result);
            return res.status(HttpStatus.BAD_REQUEST).send(result);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    /* Handle The Winning Users Event Data */
    // Todo Add JWT Auth After Testing
    @Post('game-result')
    @ApiExcludeEndpoint()
    @ApiOperation({ summary: "Game history", description: "Get game history" })
    @ApiResponse({ status: 200, description: 'Game history fetched successfully' })
    async handleGameResult(@Body() dto: GameResultDto, @Res() res: Response) {
        try {
            let result = await this.gameService.handleGameResult(dto);
            if (result.success) return res.status(HttpStatus.OK).send({ statusCode: 200, ...result });
            return res.status(HttpStatus.BAD_REQUEST).send({ statusCode: 400, ...result });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    /* Fetches the games history listing from the database */
    @Post('list')
    @ApiOperation({ summary: "Game history", description: "Get game history" })
    @ApiResponse({ status: 200, description: 'Game history fetched successfully' })
    async listGameHistory(@Body() gameListPaginatedDto: GameListPaginatedDto, @Res() res: Response) {
        try {
            let result = await this.gameService.listGameHistory(gameListPaginatedDto);
            if (result.success) return res.status(HttpStatus.OK).send({ statusCode: 200, ...result });
            return res.status(HttpStatus.BAD_REQUEST).send({ statusCode: 400, ...result });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    /* For Dashboard Sidebar Recent Winners Listing */
    @Get('recent-winners')
    @ApiOperation({ summary: "Recent Winners Listing", description: "Sidebar Recent Winners Listing" })
    @ApiResponse({ status: HttpStatus.OK, description: 'Recent winners listing fetched successfully' })
    async recentWinnersListing(@Query('type') gameType: string, @Req() req: Request, @Res() res: Response) {
        try {
            let result = await this.gameService.recentWinnersListing(gameType);
            if (result.success) return res.status(200).send({ statusCode: 200, ...result });
            return res.status(400).send({ statusCode: 400, ...result });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    /* For dashboard Sidebar Recent Top 5 Winners */
    @Get('top-five-winners')
    @ApiOperation({ summary: "Recent Top 5 Winners", description: "Get Recent Top 5 Winners" })
    @ApiResponse({ status: 200, description: "Recent top 5 winners fetched successfully" })
    async recentTopFiveWinners(@Query('type') gameType: string, @Req() req: Request, @Res() res: Response) {
        try {
            let result = await this.gameService.recentTopFiveWinners(gameType);
            if (result.success) return res.status(200).send({ status: 200, ...result });
            return res.status(400).send({ status: 400, ...result });
        } catch (error) {
            throw new InternalServerErrorException(error.message);

        }
    }


    /* For Fetching The Daily Win Ratio Listing And Their Ticket Prizes Amount */
    @Post('win-ratio')
    @ApiOperation({ summary: "Win Ratio List", description: "Win Ratio Listing With User Stats Info" })
    @ApiResponse({ status: 200, description: 'Win ratio listing fetched successfully.' })
    async winRation(@Body() dto: WinRatioListDto, @Res() res: Response) {
        try {
            let result = await this.gameService.getWinRatioListing(dto)
            if (result.success) return res.status(200).send({ statusCode: 200, ...result });
            return res.status(400).send({ statusCode: 400, ...result });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    /* Contract Service Methods */
    @Post('find-game')
    @ApiOperation({ summary: "Find Game", description: "Find Game" })
    @ApiResponse({ status: 200, description: 'Find Game Successfully' })
    async findGame(@Req() req: Request, @Res() res: Response) {
        try {
            console.log("Find Game Api Call")
            let result = await this.gameService.findGame(req.body);
            console.log(result)
            if (result.success) return res.status(200).send({ statusCode: 200, message: result.message, data: result.data });
            return res.status(400).send({ statusCode: 400, message: result.message, data: result.data });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    @Post('start-game')
    @ApiOperation({ summary: "Recent List", description: "Get Recent winner Listings" })
    @ApiResponse({ status: 200, description: 'Recent winner fetched successfully' })
    async startGame(@Req() req: Request, @Res() res: Response) {
        try {

            const { type } = req.body

            if (type === "30") {
                console.log("Type", type)
                let result = await this.gameService.start(req.body.type);

                console.log("result", result)

                if (result.success) return res.status(200).send({ statusCode: 200, message: result.message, data: result.data });
                return res.status(400).send({ statusCode: 400, message: result.message, data: result.data });
            } else if (type === "15") {
                let result = await this.gameService.start(req.body.type);

                console.log("result", result)

                if (result.success) return res.status(200).send({ statusCode: 200, message: result.message, data: result.data });
                return res.status(400).send({ statusCode: 400, message: result.message, data: result.data });
            } else {
                console.log("No Game Found set Game Type")
            }


        } catch (error) {
            throw new InternalServerErrorException(error.message);

        }
    }


    @Post('stop-game')
    @ApiOperation({ summary: "Recent List", description: "Get Recent winner Listings" })
    @ApiResponse({ status: 200, description: 'Recent winner fetched successfully' })
    async stopGame(@Req() req: Request, @Res() res: Response) {
        try {
            const message = "Stop"
            let result = await this.gameService.stop(message);

            console.log("result", result)

            if (result.success) return res.status(200).send({ statusCode: 200, message: result.message, data: result.data });
            return res.status(400).send({ statusCode: 400, message: result.message, data: result.data });

        } catch (error) {
            throw new InternalServerErrorException(error.message);

        }
    }


    @Get('get-fee-address')
    @ApiOperation({ summary: "Fee Address", description: "Get Fee Address" })
    @ApiResponse({ status: 200, description: 'Recent winner fetched successfully' })
    async getFeeAddress(@Req() req: Request, @Res() res: Response) {
        try {

            let result = await this.gameService.getFeeAddress()

            console.log("result", result)

            if (result.success) return res.status(200).send({ statusCode: 200, message: result.message, data: result.data });
            return res.status(400).send({ statusCode: 400, message: result.message, data: result.data });

        } catch (error) {
            throw new InternalServerErrorException(error.message);

        }
    }


    @Get('get-fee-jackpot-address')
    @ApiOperation({ summary: "Fee Jackpot Address", description: "Get Fee Jackpot Address" })
    @ApiResponse({ status: 200, description: 'Recent winner fetched successfully' })
    async getFeeJackpotAddress(@Req() req: Request, @Res() res: Response) {
        try {

            let result = await this.gameService.getFeeJackpotAddress()

            console.log("result", result)

            if (result.success) return res.status(200).send({ statusCode: 200, message: result.message, data: result.data });
            return res.status(400).send({ statusCode: 400, message: result.message, data: result.data });

        } catch (error) {
            throw new InternalServerErrorException(error.message);

        }
    }


    @Get('get-fee-jackpot-percentage')
    @ApiOperation({ summary: "Fee Jackpot Percentage", description: "Get Fee Jackpot Percentage" })
    @ApiResponse({ status: 200, description: 'Recent winner fetched successfully' })
    async getFeeJackpotPercentage(@Req() req: Request, @Res() res: Response) {
        try {
            console.log("get-fee-jackpot-percentage")
            const message = "Stop"

            let result = await this.gameService.getFeeJackpotPercentage();

            console.log("result", result)

            if (result.success) return res.status(200).send({ statusCode: 200, message: result.message, data: result.data });
            return res.status(400).send({ statusCode: 400, message: result.message, data: result.data });

        } catch (error) {
            throw new InternalServerErrorException(error.message);

        }
    }


    @Get('get-fee-percentage')
    @ApiOperation({ summary: "Fee Jackpot Percentage", description: "Get Fee Jackpot Percentage" })
    @ApiResponse({ status: 200, description: 'Recent winner fetched successfully' })
    async getFeePercentage(@Req() req: Request, @Res() res: Response) {
        try {
            console.log("get-fee-percentage")


            let result = await this.gameService.getFeePercentage();

            console.log("result", result)

            if (result.success) return res.status(200).send({ statusCode: 200, message: result.message, data: result.data });
            return res.status(400).send({ statusCode: 400, message: result.message, data: result.data });

        } catch (error) {
            throw new InternalServerErrorException(error.message);

        }
    }


    @Get('change-game-controller-address')
    @ApiOperation({ summary: "Change Game Fee Controller Address", description: "Change Game Controller Address" })
    @ApiResponse({ status: 200, description: 'Change Game Controller Address successfully' })
    async getGameControllerAddress(@Req() req: Request, @Res() res: Response) {
        try {
            console.log("change-game-controller-address")


            let result = await this.gameService.changeGameControllerAddress(req.body.address);

            console.log("result", result)

            if (result.success) return res.status(200).send({ statusCode: 200, message: result.message, data: result.data });
            return res.status(400).send({ statusCode: 400, message: result.message, data: result.data });

        } catch (error) {
            throw new InternalServerErrorException(error.message);

        }
    }


    @Get('get-contract-balance')
    @ApiOperation({ summary: "Contract Balance", description: "Get Contract Balance" })
    @ApiResponse({ status: 200, description: 'Fetch Contract Balance Successfully' })
    async getContractBalance(@Req() req: Request, @Res() res: Response) {
        try {
            console.log('get-contract-balance')


            let result = await this.gameService.getContractBalance();

            console.log("result", result)

            if (result.success) return res.status(200).send({ statusCode: 200, message: result.message, data: result.data });
            return res.status(400).send({ statusCode: 400, message: result.message, data: result.data });

        } catch (error) {
            throw new InternalServerErrorException(error.message);

        }
    }


    @Get('set-not-running-contract-reason')
    @ApiOperation({ summary: "Set No Running Reason", description: "Set No Running Contract Reason " })
    @ApiResponse({ status: 200, description: 'Fetch Contract Balance Successfully' })
    async setNotRunningContractReason(@Req() req: Request, @Res() res: Response) {
        try {
            console.log('get-contract-balance')


            let result = await this.gameService.setNotRunningContractReason(req.body.reason);

            console.log("result", result)

            if (result.success) return res.status(200).send({ statusCode: 200, message: result.message, data: result.data });
            return res.status(400).send({ statusCode: 400, message: result.message, data: result.data });

        } catch (error) {
            throw new InternalServerErrorException(error.message);

        }
    }


    @Get('change-game-fee-address')
    @ApiOperation({ summary: "Change Game Fee Address", description: "Change Game Fee Address" })
    @ApiResponse({ status: 200, description: 'Change Game Fee Address' })
    async changeGameFeeAddress(@Req() req: Request, @Res() res: Response) {
        try {
            console.log('change-game-fee-address')


            let result = await this.gameService.changeGameFeeAddress(req.body.address);

            console.log("result", result)

            if (result.success) return res.status(200).send({ statusCode: 200, message: result.message, data: result.data });
            return res.status(400).send({ statusCode: 400, message: result.message, data: result.data });

        } catch (error) {
            throw new InternalServerErrorException(error.message);

        }
    }


    @Get('change-jackpot-game-fee-address')
    @ApiOperation({ summary: "Jackpot Game Change Address", description: "Change Jackpot Game Fee Address" })
    @ApiResponse({ status: 200, description: 'Change Jackpot Game Fee Address Successfully' })
    async changeGameFeeJackpotAddress(@Req() req: Request, @Res() res: Response) {
        try {
            console.log('change-game-fee-address')


            let result = await this.gameService.changeGameFeeJackpotAddress(req.body.address);

            console.log("result", result)

            if (result.success) return res.status(200).send({ statusCode: 200, message: result.message, data: result.data });
            return res.status(400).send({ statusCode: 400, message: result.message, data: result.data });

        } catch (error) {
            throw new InternalServerErrorException(error.message);

        }
    }


    @Get('change-jackpot-game-fee-percentage')
    @ApiOperation({ summary: "Jackpot Game Change Percentage", description: "Change Jackpot Game Fee Percentage" })
    @ApiResponse({ status: 200, description: 'Change Jackpot Game Fee Percentage Successfully' })
    async changeGameFeeJackpotPercentage(@Req() req: Request, @Res() res: Response) {
        try {
            console.log('change-game-fee-Percentage')


            let result = await this.gameService.changeGameFeeJackpotPercentage(req.body.address);

            console.log("result", result)

            if (result.success) return res.status(200).send({ statusCode: 200, message: result.message, data: result.data });
            return res.status(400).send({ statusCode: 400, message: result.message, data: result.data });

        } catch (error) {
            throw new InternalServerErrorException(error.message);

        }
    }


    @Get('change-game-fee-percentage')
    @ApiOperation({ summary: "Game Fee Change Percentage", description: "Change Game Fee Percentage" })
    @ApiResponse({ status: 200, description: 'Change Game Fee Percentage Successfully' })
    async changeGameFeePercentage(@Req() req: Request, @Res() res: Response) {
        try {
            console.log('change-game-fee-Percentage')
            let result = await this.gameService.changeGameFeePercentage(req.body.value);
            console.log("result", result)
            if (result.success) return res.status(200).send({ statusCode: 200, message: result.message, data: result.data });
            return res.status(400).send({ statusCode: 400, message: result.message, data: result.data });
        } catch (error) {
            throw new InternalServerErrorException(error.message);

        }
    }

    @Get('initialize-bots-30/:gameId/:poolId') 
    async initializeBots30(@Param('gameId') gameId: string, @Param('poolId') poolId: string, @Res() res: Response) {
        try {
            let result = await this.gameService.initializeBots30(gameId, poolId);
            if (result.success) return res.status(200).send({ statusCode: 200, message: result.message, data: result.data });
            return res.status(400).send({ statusCode: 400, message: result.message, data: result.data });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Get('initialize-bots-15/:gameId/:poolId')
    async initializeBots15(@Param('gameId') gameId: string, @Param('poolId') poolId: string, @Res() res: Response) {
        try {
            let result = await this.gameService.initializeBots15(gameId, poolId);
            if (result.success) return res.status(200).send({ statusCode: 200, message: result.message, data: result.data });
            return res.status(400).send({ statusCode: 400, message: result.message, data: result.data });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Get('contract-trigger-test')
    async callTriggerFn(@Res() res: Response) {
        try {
            let result = await this.gameService.callTriggerFn();
            return res.status(200).send(result);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}