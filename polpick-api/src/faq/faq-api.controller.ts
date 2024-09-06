import { Controller, Get, HttpStatus, InternalServerErrorException, Param, Post, Req, Res } from "@nestjs/common";
import { FAQService } from "./services/faq.service";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";


@Controller('api/faq')
@ApiTags('FAQ')
export class FAQApiController {
    constructor(
        private faqService: FAQService
    ) { }

    @Post('list')
    @ApiBody({ schema: { properties: { search: { type: 'string' }, category_id: { type: 'string' } } }, description: 'Rate to update' })
    @ApiOperation({ summary: "FAQ List", description: "Get FAQ Listing" })
    async listFaqs(@Req() req: Request, @Res() res: Response) {
        try {
            let result = await this.faqService.list(req);
            if (result.success) return res.status(HttpStatus.OK).send(result);
            return res.status(HttpStatus.BAD_REQUEST).send(result);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Get('category/list')
    @ApiOperation({ summary: "FAQ Categories List", description: "Get FAQ Categories" })
    async getCategories(@Res() res: Response) {
        try {
            let result = await this.faqService.getCategories();
            if (result.success) return res.status(HttpStatus.OK).send(result);
            return res.status(HttpStatus.BAD_REQUEST).send(result);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}