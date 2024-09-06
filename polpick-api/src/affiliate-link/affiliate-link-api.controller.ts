import { Body, Controller, HttpStatus, InternalServerErrorException, Post, Res, UsePipes } from "@nestjs/common";
import { Response } from "express";
import { AffiliateListDto, CreateAffiliateLinkDto, CreateAffiliateUserDto, LinkAvailabilityDto, ListAffiliateLinkDto, CheckAffiliateLinkDto, AffiliateListWeeklyDto, AffiliateListMonthDto, AffiliateListDayWiseDto, ClicksRegistered } from "./dto/affiliate-link.dto";
import { AffiliateLinkService } from "./affiliate-link.service";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";

@ApiTags('Affiliate Management')
@Controller('api/affiliate-link')
export class AffiliateLinkApiController {
    constructor(
        private readonly affiliateLinkService: AffiliateLinkService
    ) { }

    @Post('list')
    @ApiConsumes('application/json')
    async list(@Body() dto: ListAffiliateLinkDto, @Res() res: Response) {
        try {
            const result = await this.affiliateLinkService.getAll(dto);
            if (result.success) return res.status(HttpStatus.OK).send(result);
            return res.status(HttpStatus.BAD_REQUEST).send(result);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Post('create-user')
    @ApiConsumes('application/json')
    async createUser(@Body() dto: CreateAffiliateUserDto, @Res() res: Response) {
        try {
            const result = await this.affiliateLinkService.createAffiliateUser(dto);
            if (result.success) return res.status(HttpStatus.OK).send(result);
            return res.status(HttpStatus.BAD_REQUEST).send(result);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Post('create-link')
    @ApiConsumes('application/json')
    async create(@Body() dto: CreateAffiliateLinkDto, @Res() res: Response) {
        try {
            const result = await this.affiliateLinkService.createLink(dto);
            if (result.success) return res.status(HttpStatus.OK).send(result);
            return res.status(HttpStatus.BAD_REQUEST).send(result);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    @Post('check-link-affiliate')
    @ApiConsumes('application/json')
    async check(@Body() dto: CheckAffiliateLinkDto, @Res() res: Response) {
        try {
            const result = await this.affiliateLinkService.checkLink(dto);
            if (result.success) return res.status(HttpStatus.OK).send(result);
            return res.status(HttpStatus.BAD_REQUEST).send(result);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    @Post('check-link')
    @ApiConsumes('application/json')
    async checkLinkAvailability(@Body() dto: LinkAvailabilityDto, @Res() res: Response) {
        try {
            const result = await this.affiliateLinkService.checkLinkAvailability(dto);
            return res.status(HttpStatus.OK).send(result);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Post('stats')
    @ApiConsumes('application/json')
    async getStats(@Body() dto: AffiliateListDto, @Res() res: Response) {
        try {
            const result = await this.affiliateLinkService.getStats(dto);
            if (result.success) return res.status(HttpStatus.OK).send(result);
            return res.status(HttpStatus.BAD_REQUEST).send(result);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    @Post('yearly-graph')
    async yearlyGraph(@Body() dto: AffiliateListDto, @Res() res: Response) {
        try {
            const result = await this.affiliateLinkService.graphYearly(dto);
            if (result.success) return res.status(HttpStatus.OK).send(result);
            return res.status(HttpStatus.BAD_REQUEST).send(result);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Post('half-yearly-graph')
    async halfYearlyGraph(@Body() dto: AffiliateListDto, @Res() res: Response) {
        try {
            const result = await this.affiliateLinkService.graphHalfYearly(dto);
            if (result.success) return res.status(HttpStatus.OK).send(result);
            return res.status(HttpStatus.BAD_REQUEST).send(result);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    @Post('weekly-graph')
    async weeklyGraph(@Body() dto: AffiliateListWeeklyDto, @Res() res: Response) {
        try {
            const result = await this.affiliateLinkService.graphWeekly(dto);
            if (result.success) return res.status(HttpStatus.OK).send(result);
            return res.status(HttpStatus.BAD_REQUEST).send(result);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    @Post('monthly-graph')
    async monthlyYearlyGraph(@Body() dto: AffiliateListMonthDto, @Res() res: Response) {
        try {
            const result = await this.affiliateLinkService.graphMonthly(dto);
            if (result.success) return res.status(HttpStatus.OK).send(result);
            return res.status(HttpStatus.BAD_REQUEST).send(result);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    @Post('day-wise-graph')
    async dayWiseGraph(@Body() dto: AffiliateListDayWiseDto, @Res() res: Response) {
        try {
            const result = await this.affiliateLinkService.graphDayWise(dto);
            if (result.success) return res.status(HttpStatus.OK).send(result);
            return res.status(HttpStatus.BAD_REQUEST).send(result);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    @Post('register-click')
    async registerClicks(@Body() dto: ClicksRegistered, @Res() res: Response) {
        try {
            const result = await this.affiliateLinkService.clicksRegistered(dto);
            if (result.success) return res.status(HttpStatus.OK).send(result);
            return res.status(HttpStatus.BAD_REQUEST).send(result);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

}