import { Controller, Get, Res, Put, Body, Req, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { UpdateSettingDTO, BotControlDTO, GetSettingDto } from "./dto/setting.dto";
import { SettingApiService } from "./setting.api.service";



@Controller('api/setting')
@ApiTags('Setting')
export class SettingApiController {
    constructor(
        private settingService: SettingApiService
    ) { }

    @Post('get')
    @ApiOperation({ summary: "Get Setting", description: "Get Setting List" })
    @ApiResponse({ status: 200, description: 'Settings fetched successfully' })
    @ApiResponse({ status: 400, description: 'Sorry, Settings data not found!' })
    async get(@Body() dto: GetSettingDto, @Res() res: Response) {
        try {
            const result = await this.settingService.getSetting(dto);
            if (result.success) {
                res.status(200).json({ status: 200, data: result.data, message: result.message });
            } else {
                res.status(400).json({ status: 400, data: result.data, message: result.message });
            }
        } catch (error) {
            console.log('error', error);
            res.status(500).json({ status: 500, data: {}, message: error.message });
        }
    }


    @Put('update')
    @ApiOperation({ summary: "Update Setting", description: "Update Setting" })
    @ApiResponse({ status: 200, description: 'Settings updated successfully' })
    @ApiResponse({ status: 400, description: 'Sorry, update not done!' })
    async update(@Body() dto: BotControlDTO, @Req() req: Request, @Res() res: Response) {
        try {
            const result = await this.settingService.updateSetting(dto);
            if (result.success) {
                res.status(200).json({ status: 200, data: result.data, message: result.message });
            } else {
                res.status(400).json({ status: 400, data: result.data, message: result.message });
            }
        } catch (error) {
            console.log('error', error);
            res.status(500).json({ status: 500, data: {}, message: error.message });
        }
    }

}