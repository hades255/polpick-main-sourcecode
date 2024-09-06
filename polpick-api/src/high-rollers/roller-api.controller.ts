import { Body, Controller, Get, InternalServerErrorException, Param, Post, Req, Res, UsePipes } from "@nestjs/common";
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { RollerService } from "./service/roller.service";
import { HighRollerListDto } from "./dto/high-rollers.dto";

@Controller('api/highroller')
@ApiTags('HighRoller')
export class RollerController { 
    constructor(
          private rollerService: RollerService,
    ) { }

    /* Get HighRollers Listing */
    @Post('list')
    @ApiOperation({ summary: "Daily highroller listing api", description: "Daily highroller listing api" })
    @ApiResponse({ status: 200, description: 'HighRoller' })
    async getHighRollerList(@Body() dto: HighRollerListDto, @Res() res: Response) {
        try {
            let result = await this.rollerService.getHighRollerList(dto);
            if (result.success) return res.status(200).send({ statusCode: 200, ...result });
            return res.status(400).send({ statusCode: 400, ...result });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

}