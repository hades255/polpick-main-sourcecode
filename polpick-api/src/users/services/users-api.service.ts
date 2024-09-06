import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { UserRepository } from "../repositories/users.repository";
import { CreateUserWallet, GetWalletUser, UpdateUserDto, OTPSendDto, OTPVerifyDto, UserDetails } from "../dto/users-api.dto";
import { ApiResponseType } from "src/common/types/api-response.type";
import { RoleRepository } from "src/role/repositories/role.repository";
import * as _ from 'underscore';
import { AdminUserDetails, BotCreateQueryDto, changePasswordDTO, ForgetPwdDTO, SigninDTO } from "../dto/users.dto";
import { faker } from "@faker-js/faker";
import { UsersDocument } from "../schemas/users.schema";
import { ConfigService } from "@nestjs/config";
import { UserRoleGroups } from "src/common/enums/user-role.enum";
import * as OTP from 'otp-generator';
import * as jwt from "jsonwebtoken";
import { UtilsService } from "src/helpers/utils.helper";
import { MailerService } from "src/helpers/mailer.helper";
import { JwtPayloadType } from "src/common/types/jwt-payload.types";
import { OrdersRepository } from "src/order/repository/order.repository";
import { UserListPaginatedDto } from "../dto/admin.dto";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import * as moment from 'moment';
import mongoose from "mongoose";
import { toJson } from "agenda/dist/job/to-json";
import { AffiliateLinkRepository } from "src/affiliate-link/repositories/affiliate-link.repository";

@Injectable()
export class UsersApiService {
    constructor(
        private readonly configService: ConfigService,
        private readonly userRepository: UserRepository,
        private readonly roleRepository: RoleRepository,
        private readonly utilService: UtilsService,
        private readonly mailerService: MailerService,
        private readonly orderRepository: OrdersRepository,
        private readonly affiliateRepo: AffiliateLinkRepository
    ) { }


    /* User Signin Method */
    async signin(body: SigninDTO): Promise<ApiResponseType> {
        try {
            const roles = await this.roleRepository.getDistinctDocument('_id', { roleGroup: "backend", isDeleted: false });
            body.email = body.email.trim().toLowerCase();
            body.roles = roles;

            const userData = await this.userRepository.fineOneWithRole(body);
            if (!userData) return { success: false, data: {}, message: 'Authentication failed!, User not found' }

            if (userData.status == 'Inactive') {
                return { success: false, data: {}, message: 'Account was set inactive by the Administrator' }
            }

            if (userData.status == 'Banned') {
                return { success: false, data: {}, message: 'Account was Banned by the Administrator' }
            }

            if (_.isEmpty(userData.role)) {
                return { success: false, data: {}, message: 'Authentication failed. You are not a valid user' }
            }

            const validPassword = this.utilService.validPassword(body.password, userData.password);
            if (!validPassword) {
                return { success: false, data: {}, message: 'Authentication failed. Wrong password!' }
            }

            const payload: JwtPayloadType = { id: userData._id?.toString() }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN.toString()
            });

            let customUserData = await this.userRepository.getCustomData({
                _id: userData._id
            });

            return { success: true, data: customUserData[0], token, message: 'Logged in in successfully' }
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(error.message);
        }
    }



    async apiChangePassword(body: changePasswordDTO): Promise<any> {
        try {
            let loginUser = new mongoose.Types.ObjectId(body.user_id)

            let userData = await this.userRepository.getById(loginUser);

            if (userData) {

                if (!this.utilService.validPassword(body['old_password'], userData.password)) {
                    return { success: false, data: {}, type: 'error', message: "Sorry old password mismatch!" };
                } else {
                    if (this.utilService.validPassword(body['password'], userData.password)) {
                        return { success: false, data: {}, type: 'error', message: "Sorry old password cannot be new password!" };
                    }
                    else {
                        let new_password = this.utilService.generateHash(body['password']);
                        let userUpdate = await this.userRepository.updateById({
                            "password": new_password
                        }, loginUser);

                        if (userUpdate) {
                            return { success: true, data: {}, type: 'success', message: "Password has been changed successfully." };
                        }
                        else {
                            return { success: false, data: {}, type: 'error', message: "Unable to change password at this moment." };
                        }
                    }
                }
            } else {
                return { success: false, data: {}, type: 'error', message: "Authentication failed, invalid email or password." };
            }

        }
        catch (error) {
            console.error(error);
            return { success: false, data: {}, type: 'error', message: error.message };
        }
    }



    async getAdminDetails(body: AdminUserDetails): Promise<ApiResponseType> {
        try {
            let userInfo = await this.userRepository.getCustomData({ _id: new mongoose.Types.ObjectId(body.user_id) });

            if (_.isEmpty(userInfo)) return { success: false, data: {}, message: 'User not found!' }

            return { success: true, data: userInfo[0], message: 'User details fetched successfully' }
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(error.message);
        }
    }

    /* User Forgot Password */
    async forgotPassword(body: ForgetPwdDTO, roleGroup: UserRoleGroups): Promise<ApiResponseType> {
        try {
            const roles = await this.roleRepository.getDistinctDocument('_id', { roleGroup: roleGroup, isDeleted: false });
            const checkUserExist = await this.userRepository.getByField({
                email: { $regex: '^' + body.email + '$', $options: 'i' },
                // role: { $in: roles },
                isDeleted: false,
            });
            if (!checkUserExist) {
                return { success: false, data: {}, message: "No account found with " + body.email }
            }

            const pwd = OTP.generate(12, {
                digits: true,
                upperCaseAlphabets: true,
                lowerCaseAlphabets: true,
                specialChars: true
            });
            body['password'] = this.utilService.generateHash(pwd);
            const sender = (process.env.PROJECT_NAME + ' Admin<' + process.env.MAIL_USERNAME + '>') as string;
            const locals = {
                name: checkUserExist.full_name,
                password: pwd,
                project_name: process.env.PROJECT_NAME
            }

            const mailTriggered = await this.mailerService.sendMail(
                sender,
                checkUserExist.email,
                "Forgot Password",
                "admin-forgot-password",
                locals
            );

            if (!mailTriggered) {
                return { success: false, data: {}, message: "Failed to trigger email. Please use old password!" }
            }

            const updateUser = await this.userRepository.updateById(body, checkUserExist._id);
            if (updateUser?._id) {
                return { success: true, data: {}, message: "Forgot password email successfully sent." }
            } else {
                return { success: false, data: {}, message: "Something went wrong!" }
            }
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(error.message);
        }
    }

    /* User logout */
    async logout(loginUser: Partial<UsersDocument>): Promise<ApiResponseType> {
        try {
            return { success: false, data: {}, message: 'Method not implemented!' }
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    /* [Admin] User Listing */
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


    /* [Admin] User Details */
    async getUserDetails(walletId: string): Promise<ApiResponseType> {
        try {
            const userInfo = await this.userRepository.getUserActivityDetails({ walletId: { $regex: walletId, $options: 'i' } });
            if (!userInfo?._id) return { success: false, data: {}, message: 'User not found!' }

            const totalWinningAmount = await this.orderRepository.calculateTotalWinLossAmount(walletId, true);
            const totalLosingAmount = await this.orderRepository.calculateTotalWinLossAmount(walletId, false);

            const totalBetAmount = totalWinningAmount + totalLosingAmount;
            const pnlPercentage = totalWinningAmount ? ((totalWinningAmount - totalBetAmount) / totalBetAmount) * 100 : 0;

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

    /* Generate and return bot users on request */
    async generateBots(body: BotCreateQueryDto): Promise<ApiResponseType> {
        const botUserRole = await this.roleRepository.getByField({ isDeleted: false, roleGroup: 'frontend', role: 'bot' });
        if (!botUserRole) return { success: false, type: 'error', data: null, message: "Something Went Wrong. Bot role not found!" }

        const botsCount = await this.userRepository.getCountByParam({ role: botUserRole._id, isDeleted: false, status: 'Active' });

        const totalRequiredCount = +body.limit;
        let totalAvailable = +botsCount;
        let botUsersArray: any = [];

        if (body.new == 'true') {
            totalAvailable = 0;
        }

        while (totalAvailable < totalRequiredCount) {
            const botUser = {
                role: botUserRole._id,
                pool_id: faker.finance.bitcoinAddress(),
                profile_image: faker.image.avatar(),
                country: faker.location.countryCode(),
                up_or_down: faker.datatype.boolean(),
                full_name: faker.person.fullName(),
                username: faker.internet.displayName(),
                isDeleted: false,
                status: 'Active',
            };

            botUsersArray.push(botUser);
            totalAvailable += 1;
        }

        await this.userRepository.save(botUsersArray);

        const allBots = await this.userRepository.getAllByFieldWithProjection({
            role: botUserRole._id,
            isDeleted: false,
            status: 'Active'
        }, {
            pool_id: 1,
            profile_image: 1,
            country: 1,
            up_or_down: 1,
            full_name: 1,
            username: 1,
            _id: 1,
        }, totalRequiredCount);

        return { success: true, data: allBots, message: 'Bots successfully added.' };
    }

    /* Generate and return users data */
    async setupUserWallet(body: CreateUserWallet): Promise<ApiResponseType> {
        try {
            let userInfo = await this.userRepository.getByField({ walletId: body.walletId });
            if (!userInfo?._id) {
                const roleData = await this.roleRepository.getByField({ role: 'user' });
                if (!roleData?._id) return { success: false, message: 'Something went wrong', data: {} };

                let isAffiliateUser = false;
                let referral_link = "";
                let referrerWalletId = "";

                if (!_.isEmpty(body.affiliate_link)) {
                    let getWalletId = await this.affiliateRepo.getByField({
                        "affiliate_link": body.affiliate_link
                    });
                    isAffiliateUser = true;
                    referral_link = body.affiliate_link; 
                    referrerWalletId = getWalletId.walletId
                }

                userInfo = await this.userRepository.save({ role: roleData._id, isAffiliateUser, walletId: body.walletId, username: faker.internet.displayName(), referral_link, profile_image: faker.image.avatar(), referrerWalletId })
            } else {
                /* Update the last wallet connected api */
                await this.userRepository.updateById({ lastWalletConnected: new Date(), lastOnline: new Date() }, userInfo._id);
            }

            if (!userInfo?._id) return { success: false, message: 'Something went wrong', data: {} };

            const userData = await this.userRepository.getUserDetails({ _id: userInfo._id });
            if (!userData.length) return { success: false, message: 'User not found!', data: {} };


            const totalWinningAmount = await this.orderRepository.calculateTotalWinLossAmount(body.walletId, true);
            const totalLosingAmount = await this.orderRepository.calculateTotalWinLossAmount(body.walletId, false);

            const totalBetAmount = totalWinningAmount + totalLosingAmount;
            const pnlPercentage = totalWinningAmount ? ((totalWinningAmount - totalBetAmount) / totalBetAmount) * 100 : -100;

            const result = { ...userData[0], pnlPercentage };
            return { success: true, message: 'User info fetched successfully', data: result };
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }


    async updateUserProfile(body: UpdateUserDto, files: Express.Multer.File[]) {
        try {
            const checkIfExists = await this.userRepository.getByField({ walletId: body.walletId, isDeleted: false })
            if (!checkIfExists?._id) return { success: false, message: 'User not found!', data: {} };


            console.log(files, "filess.....")

            if (files?.length) {
                for (let file of files) {
                    // body[file.fieldname] = this.configService.get('PROD_SERVER_BASE_URL') + 'uploads/users' + file.filename;
                    body['profile_image'] = this.configService.get('PROD_SERVER_BASE_URL') + 'uploads/users/' + file.filename;

                }
            }

            console.log(body, "bodyyyyyyyyyyyyyyyy")

            const updateUser = await this.userRepository.updateById(body, checkIfExists._id);
            console.log(updateUser, "updateUserupdateUserupdateUser")
            if (!updateUser?._id) return { success: false, message: 'Failed to update user!', data: {} };

            const userInfo = await this.userRepository.getUserDetails({ walletId: body.walletId, isDeleted: false });
            return { success: true, message: 'User profile updated successfully.', data: userInfo[0] };
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }



    async otpSend(body: OTPSendDto): Promise<ApiResponseType> {
        try {
            const checkIfExists = await this.userRepository.getByField({ walletId: body.walletId, username: body.userName, isDeleted: false });

            if (!checkIfExists?._id) return { success: false, message: 'User not found!', data: {} };

            const otp = OTP.generate(6, {
                digits: true,
                upperCaseAlphabets: true,
                lowerCaseAlphabets: true,
                specialChars: true
            });

            const sender = (process.env.PROJECT_NAME + ' Admin<' + process.env.MAIL_USERNAME + '>') as string;
            const locals = {
                userName: body.userName,
                otp,
                project_name: process.env.PROJECT_NAME
            }

            const mailTriggered = await this.mailerService.sendMail(
                sender,
                body.email,
                "OTP",
                "otp-send",
                locals
            );

            if (!mailTriggered) {
                return { success: false, data: {}, message: "Failed to trigger email. Please use old password!" }
            } else {
                let otpExpirationTime: Date = moment().add(10, "minutes").toDate();
                await this.userRepository.updateById({
                    otp, otpExpirationTime
                }, checkIfExists?._id);
                return { success: true, data: {}, message: 'OTP send successfully!' }
            }

        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(error.message);
        }
    }


    async verifyOtp(body: OTPVerifyDto): Promise<ApiResponseType> {
        try {
            const checkIfExists = await this.userRepository.getByField({ walletId: body.walletId, isDeleted: false });

            if (!checkIfExists?._id) return { success: false, message: 'User not found!', data: {} };

            if (checkIfExists.isOtpVerified) {
                return { success: true, message: 'OTP is already verified!', data: {} };
            }

            if (moment(moment().format()).isSameOrBefore(checkIfExists.otpExpirationTime)) {
                if (body.otp == checkIfExists.otp) {
                    let otp = "";
                    let otpExpirationTime = null;
                    // let isOtpVerified = false;

                    let userUpdate = await this.userRepository.updateById({
                        otp, otpExpirationTime
                    }, checkIfExists?._id);

                    if (!_.isEmpty(userUpdate) && userUpdate._id) {
                        return { success: true, message: 'OTP verified successfully!', data: {} };
                    } else {
                        return { success: false, message: 'Something went wrong!', data: {} };

                    }
                } else {
                    return { success: false, message: 'OTP mismatched!', data: {} };

                }
            } else {
                return { success: false, message: 'OTP is already expired!', data: {} };

            }

        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(error.message);
        }
    }

}