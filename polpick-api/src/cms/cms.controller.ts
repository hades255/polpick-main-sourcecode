import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Body, UploadedFiles, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common/decorators';
import { UseFilters } from '@nestjs/common/decorators/core/exception-filters.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiExcludeController } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { CmsService } from './services/cms.service';
import { CMSUpdateDTO } from './dto/cms.dto';
import { AnyFileInterceptor } from 'src/common/intercepters/files.intercepter';


@Controller('cms')
@ApiExcludeController()
@UseGuards(AuthGuard('jwt'))
export class CmsController {
    constructor(
        private cmsService: CmsService
    ) { }

    @Get('list')
    async userListView(@Req() req: Request, @Res() res: Response) {
        try {
            res.render('cms/list.ejs', {
                page_name: 'cms-management',
                page_title: 'General CMS',
                user: req.user,
            });
        } catch (error) {
            console.error(error, 'error');
            res.redirect('/');
        }
    }

    @Post('getall')
    async getAll(@Req() req: Request, @Res() res: Response) {
        try {
            const result = await this.cmsService.getAll(req);
            res.status(result.status).send(result);
        } catch (error) {
            console.error(error, 'error');
            res.redirect('/dashboard');
        }
    }

    @Post('update')
    @UseInterceptors(AnyFileInterceptor('cms'))
    async update(@Body() dto: CMSUpdateDTO, @Req() req: Request, @Res() res: Response, @UploadedFiles() files: Express.Multer.File[]) {
        try {
            const result = await this.cmsService.update(dto, files);
            res.redirect('/cms/list');
        } catch (error) {
            console.error(error, 'error');
            res.redirect('/dashboard');
        }
    }
}
