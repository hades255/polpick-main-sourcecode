import { Body, Controller, HttpStatus, InternalServerErrorException, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ApiConsumes, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AdminApiService } from '../services/admin-api.service';
import { UserListPaginatedDto } from '../dto/admin.dto';


@ApiTags("Admin")
@Controller("api/admin")
@UseGuards(AuthGuard('jwt'))
@ApiSecurity('x-access-token')
export class AdminApiController {
  constructor(
    private readonly adminApiService: AdminApiService
  ) { }


  @Post('users/list')
  @ApiConsumes('application/json')
  @ApiOperation({ summary: "Users Listing", description: "" })
  async usersList(@Body() dto: UserListPaginatedDto, @Res() res: Response) {
    try {
      const result = await this.adminApiService.usersListing(dto);
      if (result.success) return res.status(HttpStatus.OK).send(result);
      return res.status(HttpStatus.BAD_REQUEST).send(result);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }


  @Post('users/detail/:walletId')
  @ApiConsumes('application/json')
  @ApiOperation({ summary: "Users Listing", description: "" })
  async userDetails(@Param('walletId') walletId: string, @Res() res: Response) {
    try {
      const result = await this.adminApiService.getUserDetails(walletId);
      if (result.success) return res.status(HttpStatus.OK).send(result);
      return res.status(HttpStatus.BAD_REQUEST).send(result);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }


  // @Post('users-activity-graph')
  // @ApiConsumes('application/json')
  // @ApiOperation({ summary: "Users Activity Data", description: "Users Activity Trend Data By Custom Filters" })
  // async userActivityGraph(@Body() dto: UserGraphActivityDto, @Res() res: Response) {
  //   try {
  //     const result = await this.adminApiService.getUserActivityGraphData(dto);
  //     if (result.success) return res.status(HttpStatus.OK).send(result);
  //     return res.status(HttpStatus.BAD_REQUEST).send(result);
  //   } catch (error) {
  //     console.error(error);
  //     throw new InternalServerErrorException(error.message);
  //   }
  // }
}