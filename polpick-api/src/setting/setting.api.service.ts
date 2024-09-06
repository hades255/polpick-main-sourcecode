import { Injectable } from "@nestjs/common";
import { SettingRepository } from "./repositories";
import _ from 'underscore';
import { UpdateSettingDTO, BotControlDTO, GetSettingDto } from "./dto/setting.dto";



@Injectable()
export class SettingApiService {
    constructor(
        private SettingRepo: SettingRepository
    ) { }

    async getSetting(dto: GetSettingDto): Promise<{ success: boolean, data: any, type: string, message: string }> {
        try {
            const settingData = await this.SettingRepo.getByFieldWithProjection({ "isDeleted": false }, { isDeleted: 0, createdAt: 0, updatedAt: 0 });
            if (!_.isEmpty(settingData)) {
                if (dto.botsType === 15) {
                    return {
                        success: true, data: {
                            avgBetAmountPerBot: settingData["avgBetAmountPerBot15"],
                            botToDecreaseAfterOneUser: settingData["botToDecreaseAfterOneUser15"],
                            maxBotPerGame: settingData["maxBotPerGame15"],
                            minAmountOfBotPerGame: settingData["minAmountOfBotPerGame15"]
                        },
                        type: 'success',
                        message: 'Settings fetched successfully'
                    };

                } else {
                    return {
                        success: true, data: {
                            avgBetAmountPerBot: settingData["avgBetAmountPerBot30"],
                            botToDecreaseAfterOneUser: settingData["botToDecreaseAfterOneUser30"],
                            maxBotPerGame: settingData["maxBotPerGame30"],
                            minAmountOfBotPerGame: settingData["minAmountOfBotPerGame30"]
                        },
                        type: 'success',
                        message: 'Settings fetched successfully'
                    };
                }
            } else {
                return { success: false, data: {}, type: 'error', message: 'Sorry, Settings data not found!' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: {}, type: 'error', message: error.message };
        }
    }

    async updateSetting(updateSettingDTO: BotControlDTO): Promise<{ success: boolean, data: any, type: string, message: string }> {
        try {

            const settingData = await this.SettingRepo.getByFieldWithProjection({ "isDeleted": false }, { isDeleted: 0, createdAt: 0, updatedAt: 0 });
            let updatedSetting;
            if (updateSettingDTO.botsType === 15) {
                let updBody = {
                    avgBetAmountPerBot15: updateSettingDTO.avgBetAmountPerBot,
                    botToDecreaseAfterOneUser15: updateSettingDTO.botToDecreaseAfterOneUser,
                    maxBotPerGame15: updateSettingDTO.maxBotPerGame,
                    minAmountOfBotPerGame15: updateSettingDTO.minAmountOfBotPerGame,
                }
                updatedSetting = await this.SettingRepo.updateById(updBody, settingData._id);
            } else {
                let updBody = {
                    avgBetAmountPerBot30: updateSettingDTO.avgBetAmountPerBot,
                    botToDecreaseAfterOneUser30: updateSettingDTO.botToDecreaseAfterOneUser,
                    maxBotPerGame30: updateSettingDTO.maxBotPerGame,
                    minAmountOfBotPerGame30: updateSettingDTO.minAmountOfBotPerGame,
                }
                updatedSetting = await this.SettingRepo.updateById(updBody, settingData._id);
            }


            if (updatedSetting) {
                return { success: true, data: {}, type: 'success', message: 'Settings updated successfully' };
            } else {
                return { success: false, data: {}, type: 'error', message: 'Sorry, Settings data not updated!' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: {}, type: 'error', message: error.message };
        }
    }
}