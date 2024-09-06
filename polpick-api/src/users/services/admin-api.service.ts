import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { UserRepository } from "../repositories/users.repository";
import { RoleRepository } from "src/role/repositories/role.repository";
import _ from 'underscore';
import { ApiResponseType } from "src/common/types/api-response.type";
import { UserListPaginatedDto } from "../dto/admin.dto";
import { ethers } from "ethers";
import { ConfigService } from "@nestjs/config";
import BigNumber from "bignumber.js";
import { OrdersRepository } from "src/order/repository/order.repository";

@Injectable()
export class AdminApiService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly roleRepository: RoleRepository,
        private readonly configService: ConfigService,
        private readonly orderRepository: OrdersRepository
    ) { }

    async usersListing(dto: UserListPaginatedDto): Promise<ApiResponseType> {
        try {
            const provider = new ethers.JsonRpcProvider(this.configService.get<string>('DEDICATED_BASE_RPC_URL'));

            const userRole = await this.roleRepository.getByField({ role: 'user' });
            if (!userRole?._id) {
                throw new InternalServerErrorException('Something went wrong! Role not found.');
            }

            dto.role = userRole?._id?.toString();
            const usersList = await this.userRepository.getAllUsersPaginated(dto);

            for (let user of usersList.docs) {
                user['walletBalance'] = new BigNumber((await provider.getBalance(user.walletId)).toString()).div(Math.pow(10, 18));
            }

            return {
                success: true,
                message: "Users listing fetched successfully.",
                data: usersList.docs,
                limit: usersList.limit,
                page: usersList.page,
                pages: usersList.totalPages,
                total: usersList.totalDocs
            };
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(error.message);
        }
    }


    async getUserDetails(walletId: string): Promise<ApiResponseType> {
        try {
            const userInfo = await this.userRepository.getUserActivityDetails({ walletId: walletId });
            if (!userInfo?._id) return { success: false, data: {}, message: 'User not found!' }

            const totalWinningAmount = await this.orderRepository.calculateTotalWinLossAmount(walletId, true);
            const totalLosingAmount = await this.orderRepository.calculateTotalWinLossAmount(walletId, false);

            const totalBetAmount = totalWinningAmount + totalLosingAmount;
            const pnlPercentage = totalWinningAmount ? ((totalWinningAmount - totalBetAmount) / totalBetAmount) * 100 : -100;

            const result = {
                ...userInfo,
                totalWinnings: totalWinningAmount,
                totalLoses: totalLosingAmount,
                pnlPercentage: pnlPercentage
            }

            return { success: true, data: result, message: 'User details fetched successfully' }
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(error.message);
        }
    }

}