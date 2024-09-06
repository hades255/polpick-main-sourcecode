import { Injectable } from '@nestjs/common';
import * as _ from 'underscore';
import { ApiResponseType } from 'src/common/types/api-response.type';
import { RollerRepo } from '../repository/roller.repository';
import { OrdersRepository } from 'src/order/repository/order.repository';
import { HighRollerListDto } from '../dto/high-rollers.dto';
import * as moment from 'moment';

@Injectable()
export class RollerService {
    constructor(
         private rollerRepo: RollerRepo,
         private readonly orderRepository: OrdersRepository
    ) { }

    /* Get HighRollers Listing */
    async getHighRollerList(listingDto: HighRollerListDto): Promise<ApiResponseType> {
        try {
            const rollersData = await this.orderRepository.getHighRollerListing(listingDto);

            let userRankingData: any = {
                rank: 0,
                totalTurnOver: 0,
                endTime: moment().utc().endOf('day').unix(),
                currentTime: moment().utc().unix(),
            };

            if (listingDto.walletId) {
                const foundUser = rollersData.find(val => val.walletId === listingDto.walletId);
                if (foundUser) {
                    userRankingData = {
                        rank: foundUser.rank,
                        totalTurnOver: foundUser.totalTurnOver,
                        endTime: moment().utc().endOf('day').unix(),
                        currentTime: moment().utc().unix(),
                    };
                }
            }

            return { success: true, data: rollersData, user_data: userRankingData, message: 'Highroller listing fetched successfully.' };
        } catch (error) {
            return { success: false, message: error.message, data: [] };
        }
    }
}
