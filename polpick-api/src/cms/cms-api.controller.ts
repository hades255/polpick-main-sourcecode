import { Controller, Get, InternalServerErrorException, Param, Req, Res } from "@nestjs/common";
import { CmsService } from "./services/cms.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";


@Controller('api/cms')
@ApiTags('CMS')
export class CmsApiController {
    constructor(
        private cmsService: CmsService
    ) { }
    
    @Get('home')
    @ApiOperation({ summary: "CMS List", description: "Get CMS Data" })
    @ApiResponse({ status: 200, description: 'CMS Data fetched successfully' })
    async listSlugs(@Req() req: Request, @Res() res: Response) {
        try {
            let result = await this.cmsService.list();
            if (result.success) return res.status(200).send({ statusCode: 200, message: result.message, data: result.data });
            return res.status(400).send({ statusCode: 400, message: result.message, data: result.data });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    // @Get('detail/:slug')
    // @ApiOperation({ summary: "Category List", description: "Get Category Listings" })
    // @ApiResponse({ status: 200, description: 'Categories fetched successfully' })
    // async detailBySlug(@Param('slug') slug: string, @Req() req: Request, @Res() res: Response) {
    //     try {
    //         let result = await this.cmsService.getBySlug(slug);
    //         if (result.success) return res.status(200).send({ statusCode: 200, message: result.message, data: result.data });
    //         return res.status(400).send({ statusCode: 400, message: result.message, data: result.data });
    //     } catch (error) {
    //         throw new InternalServerErrorException(error.message);
    //     }
    // }

}