import { Body, Controller, Get, HttpStatus, InternalServerErrorException, Param, Post, Query, Req, Res, UploadedFiles, UseFilters, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { ApiConsumes, ApiOperation, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { UsersApiService } from "../services/users-api.service";
import { Request, Response } from "express";
import { CreateUserWallet, GetWalletUser, UpdateUserDto, OTPSendDto, OTPVerifyDto, UserDetails } from "../dto/users-api.dto";
import { AdminUserDetails, BotCreateQueryDto, changePasswordDTO, ForgetPwdDTO, SigninDTO } from "../dto/users.dto";
import { AnyFileInterceptor } from "src/common/intercepters/files.intercepter";
import { UsersDocument } from "../schemas/users.schema";
import { LoginUser } from "src/common/decorators/user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UserRole, UserRoleGroups } from "src/common/enums/user-role.enum";
import { UserListPaginatedDto } from "../dto/admin.dto";
import { RoleAuthGuard } from "src/auth/guards/role.guard";
import { Roles } from "src/common/decorators/role.decorator";

@Controller('api/user')
@ApiTags('User')
export class UsersApiController {
    constructor(
        private userApiService: UsersApiService
    ) { }


    @Post('signin')
    @ApiConsumes('application/json')
    @ApiOperation({ summary: "User login", description: "" })
    async login(@Body() dto: SigninDTO, @Res() res: Response, @Req() req: Request) {
        let result = await this.userApiService.signin(dto);
        if (result.success) return res.status(HttpStatus.OK).send(result);
        return res.status(HttpStatus.BAD_REQUEST).send(result);
    }


    @Post('change-password')
    @UseGuards(AuthGuard('jwt'))
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleAuthGuard)
    @ApiSecurity('x-access-token')
    @ApiConsumes('application/json')
    @ApiOperation({ summary: "Change password", description: "Change password" })
    async changePassword(@Body() dto: changePasswordDTO, @Req() req: Request, @Res() res: Response) {
        try {
            const result = await this.userApiService.apiChangePassword(dto);
            if (result.success) {
                res.status(200).json({ status: 200, data: result.data, message: result.message });
            } else {
                res.status(400).json({ status: 400, data: result.data, message: result.message });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, data: {}, message: error.message });
        }
    }



    @Post('admin/details')
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleAuthGuard)
    @ApiSecurity('x-access-token')
    @ApiConsumes('application/json')
    @ApiOperation({ summary: "Admin User Details", description: "" })
    async adminUserDetails(@Body() dto: AdminUserDetails, @Res() res: Response) {
        try {
            const result = await this.userApiService.getAdminDetails(dto);
            if (result.success) return res.status(HttpStatus.OK).send(result);
            return res.status(HttpStatus.BAD_REQUEST).send(result);
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(error.message);
        }
    }


    @Post('forgot-password')
    @ApiConsumes('application/json')
    @ApiOperation({ summary: "Forgot password", description: "" })
    async forgotPassword(@Body() dto: ForgetPwdDTO, @Res() res: Response) {
        let result = await this.userApiService.forgotPassword(dto, UserRoleGroups.BACKEND);
        if (result.success) return res.status(HttpStatus.OK).send(result);
        return res.status(HttpStatus.BAD_REQUEST).send(result);
    }


    @Get("logout")
    @UseGuards(AuthGuard("jwt"))
    @ApiOperation({ summary: "User logout", description: "" })
    async logout(@LoginUser() loginUser: Partial<UsersDocument>, @Req() req: Request, @Res() res: Response) {
        try {
            const result = await this.userApiService.logout(loginUser);
            if (result.success) return res.status(HttpStatus.OK).send(result);
            return res.status(HttpStatus.BAD_REQUEST).send(result);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    // [Admin] Get Users Listing For Admin Panel
    @Post('users/list')
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleAuthGuard)
    @ApiSecurity('x-access-token')
    @ApiConsumes('application/json')
    @ApiOperation({ summary: "Admin Users Listing", description: "" })
    async usersList(@Body() dto: UserListPaginatedDto, @Res() res: Response) {
        try {
            const result = await this.userApiService.usersListing(dto);
            if (result.success) return res.status(HttpStatus.OK).send(result);
            return res.status(HttpStatus.BAD_REQUEST).send(result);
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(error.message);
        }
    }

    // [Admin] Get User Details For Admin Panel
    @Post('users/detail/:walletId')
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleAuthGuard)
    @ApiSecurity('x-access-token')
    @ApiConsumes('application/json')
    @ApiOperation({ summary: "Admin User Details", description: "" })
    async userDetails(@Param('walletId') walletId: string, @Res() res: Response) {
        try {
            const result = await this.userApiService.getUserDetails(walletId);
            if (result.success) return res.status(HttpStatus.OK).send(result);
            return res.status(HttpStatus.BAD_REQUEST).send(result);
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(error.message);
        }
    }


    /* Generate and return bot users on request */
    @Get('generate-bots')
    @ApiConsumes('application/json')
    @ApiOperation({ summary: "Generate and return array of bots", description: "" })
    async generateBots(@Query() dto: BotCreateQueryDto, @Res() res: Response) {
        try {
            let result = await this.userApiService.generateBots(dto);
            if (result.success) return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, data: result.data, message: result.message });
            return res.status(HttpStatus.BAD_REQUEST).json({ statusCode: HttpStatus.BAD_REQUEST, data: result.data, message: result.message });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    /* Create user or fetch existing user details */
    @Post('create-wallet-user')
    @ApiConsumes('application/json')
    @ApiOperation({ summary: "Create wallet or get existing wallet details", description: "" })
    async setupUserWallet(@Body() dto: CreateUserWallet, @Req() req: Request, @Res() res: Response) {
        try {
            let result = await this.userApiService.setupUserWallet(dto);
            if (result.success) return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, data: result.data, message: result.message });
            return res.status(HttpStatus.BAD_REQUEST).json({ statusCode: HttpStatus.BAD_REQUEST, data: result.data, message: result.message });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    @Post('update-profile')
    @UseInterceptors(AnyFileInterceptor('users'))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: "Update user profile", description: "User profile updated successfully." })
    async updateUserProfile(@Body() dto: UpdateUserDto, @UploadedFiles() files: Express.Multer.File[], @Res() res: Response) {
        try {
            let result = await this.userApiService.updateUserProfile(dto, files);
            if (result.success) return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, data: result.data, message: result.message });
            return res.status(HttpStatus.BAD_REQUEST).json({ statusCode: HttpStatus.BAD_REQUEST, data: result.data, message: result.message });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    @Post('otp-send')
    @ApiConsumes('application/json')
    @ApiOperation({ summary: "Otp Send", description: "Otp Send To The User" })
    async otpSend(@Body() dto: OTPSendDto, @Res() res: Response) {
        try {
            const result = await this.userApiService.otpSend(dto);
            if (result.success) return res.status(HttpStatus.OK).send(result);
            return res.status(HttpStatus.BAD_REQUEST).send(result);
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(error.message);
        }
    }


    @Post('verify-otp')
    @ApiConsumes('application/json')
    @ApiOperation({ summary: "Otp Verification", description: "Otp Verification" })
    async otpVerify(@Body() dto: OTPVerifyDto, @Res() res: Response) {
        try {
            const result = await this.userApiService.verifyOtp(dto);
            if (result.success) return res.status(HttpStatus.OK).send(result);
            return res.status(HttpStatus.BAD_REQUEST).send(result);
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(error.message);
        }
    }

}