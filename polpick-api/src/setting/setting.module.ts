import { Module } from "@nestjs/common";
import { SettingApiController } from "./setting.api.controller";
import { SettingApiService } from "./setting.api.service";



@Module({
    imports: [],
    controllers: [SettingApiController],
    providers: [SettingApiService],
    exports: []
})
export class SettingModule { }