import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ListAffiliateLinkDto, CreateAffiliateLinkDto, CreateAffiliateUserDto, AffiliateListDto, LinkAvailabilityDto, CheckAffiliateLinkDto, AffiliateListWeeklyDto, AffiliateListMonthDto, AffiliateListDayWiseDto, ClicksRegistered } from "./dto/affiliate-link.dto";
import { ApiPaginatedResponseType, ApiResponseType } from "src/common/types/api-response.type";
import { AffiliateLinkRepository } from "./repositories/affiliate-link.repository";
import { AffiliateLinkDocument } from "./schemas/affiliate-link.schema";
import { UtilsService } from "src/helpers/utils.helper";
import { UserRepository } from "src/users/repositories/users.repository";
import { OrdersRepository } from "src/order/repository/order.repository";
import { UsersDocument } from "src/users/schemas/users.schema";
import * as moment from "moment";
import * as os from 'os';
import _ from "underscore";

@Injectable()
export class AffiliateLinkService {
    constructor(
        private readonly affiliateLinkRepo: AffiliateLinkRepository,
        private readonly utilsService: UtilsService,
        private readonly userRepository: UserRepository,
        private readonly orderRepository: OrdersRepository
    ) { }

    async getAll(listDto: ListAffiliateLinkDto): Promise<ApiPaginatedResponseType<AffiliateLinkDocument>> {
        try {
            const allLinks = await this.affiliateLinkRepo.getListPaginated(listDto);

            return {
                success: true,
                message: 'Affiliate links fetched successfully.',
                data: allLinks.docs,
                limit: allLinks.limit,
                page: allLinks.page,
                pages: allLinks.totalPages,
                total: allLinks.totalDocs,
            };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async createLink(createLinkDto: CreateAffiliateLinkDto): Promise<ApiResponseType> {
        try {
            const affiliateUserInfo = await this.userRepository.getByField({ walletId: createLinkDto.walletId });
            if (!affiliateUserInfo?._id) {
                return { success: false, data: {}, message: 'Affiliate owner data not found!' };
            }

            const linkName = createLinkDto.link_name.toLowerCase().replace(/\s/g, "");
            const checkIfLinkExists = await this.affiliateLinkRepo.getByField({ affiliate_link: { $regex: '^' + linkName + '$', $options: 'i' } });
            if (checkIfLinkExists?._id) {
                return { success: false, data: {}, message: 'Affiliate link already exists!' };
            }

            createLinkDto['affiliate_link'] = linkName;

            const createLink = await this.affiliateLinkRepo.save(createLinkDto);
            if (!createLink?._id) return { success: false, data: {}, message: 'Failed to create affiliate link.' };
            return { success: true, data: createLink, message: 'Affiliate link created successfully.' };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }



    async checkLink(checkLinkDto: CheckAffiliateLinkDto): Promise<ApiResponseType> {
        try {
            // const affiliateUserInfo = await this.userRepository.getByField({ walletId: checkLinkDto.walletId });
            // if (!affiliateUserInfo?._id) {
            //     return { success: false, data: {}, message: 'Affiliate owner data not found!' };
            // }

            const checkIfLinkExists = await this.affiliateLinkRepo.getByField({ affiliate_link: { $regex: '^' + checkLinkDto.affiliate_link + '$', $options: 'i' } });
            if (checkIfLinkExists?._id) {
                return { success: true, data: {}, message: 'Valid!' };
            } else {
                return { success: true, data: {}, message: 'Invalid.' };
            }
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async checkLinkAvailability(linkAvailabilityDto: LinkAvailabilityDto) {
        try {
            const linkName = linkAvailabilityDto.link_name.toLowerCase().replace(/\s/g, "");

            const checkIfLinkExists = await this.affiliateLinkRepo.getByField({ affiliate_link: { $regex: '^' + linkName + '$', $options: 'i' } });
            if (checkIfLinkExists?._id) {
                return { success: false, data: {}, message: 'Affiliate link already exists!' };
            } else {
                return { success: true, data: {}, message: 'Affiliate link is available.' };
            }
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getStats(body: AffiliateListDto): Promise<ApiResponseType> {
        try {
            const stats_data = {
                links_count: 0,
                friends_count: 0,
                total_earnings: 0,
                todays_earnings: 0,
            }

            const referrerInfo = await this.userRepository.getByField({ walletId: body.walletId, isDeleted: false });
            /* Fetch total links count */
            const totalLinks = await this.affiliateLinkRepo.getCountByParam({ isDeleted: false, walletId: body.walletId });
            /* Fetch total affiliated users count */
            const totalFriends = await this.userRepository.getAllUsersByReferralLink({ referrerWalletId: body.walletId })
            /* Fetch total earnings made from affiliated users */
            const totalEarnings = await this.orderRepository.getTotalEarningsByReferralLink({ referrerWalletId: body.walletId });
            const todaysEarnings = await this.orderRepository.getTotalEarningsByReferralLink({ referrerWalletId: body.walletId, createdAt: { $gte: new Date(moment().startOf('day').format()) } });
            stats_data.friends_count = totalFriends.length;
            stats_data.total_earnings = totalEarnings.reduce((prev, curr) => prev += curr.referralAmount, 0);
            stats_data.todays_earnings = todaysEarnings.reduce((prev, curr) => prev += curr.referralAmount, 0);
            stats_data.links_count = totalLinks;

            return { success: true, data: stats_data, refferrer_info: referrerInfo, message: 'Affiliate dashboard stats fetched successfully.' };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async createAffiliateUser(createUserDto: CreateAffiliateUserDto): Promise<ApiResponseType> {
        try {
            let affiliateUserData: Partial<UsersDocument>;

            const userInfo = await this.userRepository.getByField({ walletId: createUserDto.walletId });
            if (userInfo?._id) {
                affiliateUserData = await this.userRepository.updateById({ ...createUserDto, isAffiliateManager: true }, userInfo._id);
            } else {
                affiliateUserData = await this.userRepository.save({ ...createUserDto, isAffiliateManager: true });
            }

            if (!affiliateUserData?._id) return { success: false, data: {}, message: 'Failed to create affiliate account.' };
            return { success: true, data: affiliateUserData, message: 'Affiliate account created successfully.' };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    async graphYearly(affiliateUserDto: AffiliateListDto): Promise<ApiResponseType> {
        try {
            let affiliateUserData: Partial<UsersDocument>;

            const userInfo = await this.userRepository.getByField({ walletId: affiliateUserDto.walletId });

            if (!userInfo?._id) {
                return { success: false, data: {}, message: 'Account not found!' };
            } else {
                const yearlyGraph = await this.userRepository.getAffiliateGraphYearWise({ referrerWalletId: affiliateUserDto.walletId, year: affiliateUserDto.year })

                return { success: true, data: yearlyGraph, message: 'Graph info fetched successfully!' };
            }

        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    async graphWeekly(affiliateUserDto: AffiliateListWeeklyDto): Promise<ApiResponseType> {
        try {
            let affiliateUserData: Partial<UsersDocument>;

            const userInfo = await this.userRepository.getByField({ walletId: affiliateUserDto.walletId });

            if (!userInfo?._id) {
                return { success: false, data: {}, message: 'Account not found!' };
            } else {
                const yearlyGraph = await this.userRepository.getAffiliateGraphWeekWise({ referrerWalletId: affiliateUserDto.walletId, date: affiliateUserDto.date })

                return { success: true, data: yearlyGraph, message: 'Graph info fetched successfully!' };
            }

        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }



    async graphHalfYearly(affiliateUserDto: AffiliateListDto): Promise<ApiResponseType> {
        try {
            let affiliateUserData: Partial<UsersDocument>;

            const userInfo = await this.userRepository.getByField({ walletId: affiliateUserDto.walletId });

            if (!userInfo?._id) {
                return { success: false, data: {}, message: 'Account not found!' };
            } else {
                const yearlyGraph = await this.userRepository.getAffiliateGraphYearWise({ referrerWalletId: affiliateUserDto.walletId, year: affiliateUserDto.year })

                const firstSixMonths = yearlyGraph.slice(0, 6);

                return { success: true, data: firstSixMonths, message: 'Graph info fetched successfully!' };
            }

        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }



    async graphMonthly(affiliateUserDto: AffiliateListMonthDto): Promise<ApiResponseType> {
        try {
            let affiliateUserData: Partial<UsersDocument>;

            const userInfo = await this.userRepository.getByField({ walletId: affiliateUserDto.walletId });

            if (!userInfo?._id) {
                return { success: false, data: {}, message: 'Account not found!' };
            } else {
                const monthlyGraph = await this.userRepository.getAffiliateGraphMonthWise({ referrerWalletId: affiliateUserDto.walletId, year: affiliateUserDto.year, month: affiliateUserDto.month })

                // const firstSixMonths = yearlyGraph.slice(0, 6);

                return { success: true, data: monthlyGraph, message: 'Graph info fetched successfully!' };
            }

        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }



    async graphDayWise(affiliateUserDto: AffiliateListDayWiseDto): Promise<ApiResponseType> {
        try {
            let affiliateUserData: Partial<UsersDocument>;

            const userInfo = await this.userRepository.getByField({ walletId: affiliateUserDto.walletId });

            if (!userInfo?._id) {
                return { success: false, data: {}, message: 'Account not found!' };
            } else {
                const graphDayWise = await this.userRepository.getAffiliateGraphDayWise({ referrerWalletId: affiliateUserDto.walletId, year: affiliateUserDto.year, month: affiliateUserDto.month, day: affiliateUserDto.date })

                const first24Hours = graphDayWise.slice(0, 24);

                return { success: true, data: first24Hours, message: 'Graph info fetched successfully!' };
            }

        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }



    async clicksRegistered(dto: ClicksRegistered): Promise<ApiResponseType> {
        try {
            const getAffiliateInfo = await this.affiliateLinkRepo.getByField({ "affiliate_link": dto.affiliate_link, "isDeleted": false });
            const addresses = {
                IPv4: [],
                IPv6: []
            };
            if (!getAffiliateInfo?._id) {
                return { success: false, data: {}, message: 'Affiliate link not found!' };
            }

            const interfaces = os.networkInterfaces();

            for (const interfaceName in interfaces) {
                const iface = interfaces[interfaceName];
                for (const alias of iface) {
                    if (alias.family === 'IPv4' && !alias.internal) {
                        addresses.IPv4.push(alias.address);
                    }
                    if (alias.family === 'IPv6' && !alias.internal) {
                        addresses.IPv6.push(alias.address);
                    }
                }
            }


            const addressesExist = await this.affiliateLinkRepo.checkIfAddressesExist(addresses.IPv4, addresses.IPv6);

            if (addressesExist) {
              return { success: true, data: {}, message: 'IP addresses already exist' };
            }

            let saveObj = {
                referrerWalletId: getAffiliateInfo.walletId,
                affiliate_link: dto.affiliate_link,
                ipv4: addresses.IPv4,
                ipv6: addresses.IPv6
            }

            let save = await this.affiliateLinkRepo.saveClicks(saveObj);

            if (!_.isEmpty(save) && save._id) {
                return { success: true, data: {}, message: 'Click registered successfully' };
            } else {
                return { success: false, data: {}, message: 'Click not registered' };
            }

        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

}