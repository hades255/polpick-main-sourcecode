import { Body, Controller, Get, Post, Req, Res, UploadedFiles, UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { ApiExcludeController } from '@nestjs/swagger';
import { BotCreateQueryDto, ChangePwdDTO, IdArrayDTO, UserCreateFromAdminDTO, UserUpdateFromAdminDTO } from '../dto/users.dto';
import { AnyFileInterceptor } from 'src/common/intercepters/files.intercepter';
import { UserRepository } from '../repositories/users.repository';
import { Types } from 'mongoose';
import { UserActivityTimelineRepository } from 'src/user-activity-timeline/repositories/user-activity-timeline.repository';
import { Country } from "country-state-city";
import { UsersApiService } from '../services/users-api.service';


@Controller("bots")
@ApiExcludeController()
@UseGuards(AuthGuard("jwt"))
export class BotsController {
  constructor(
    private userApiService: UsersApiService,
    private userRepo: UserRepository,
    private userActivityRepo: UserActivityTimelineRepository
  ) {}

  // @Get("list")
  // async userListView(@Req() req: Request, @Res() res: Response) {
  //   try {
  //     const stats = await this.userApiService.userListPageStats();
  //     const countries = Country.getAllCountries();

  //     res.render("users/bot-list.ejs", {
  //       page_name: "bot-management",
  //       page_title: "Bots",
  //       user: req.user,
  //       stats,
  //       countries,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.redirect("/");
  //   }
  // }

  // @Post("getall")
  // async getAllUser(@Req() req: Request, @Res() res: Response) {
  //   try {
  //     const result = await this.userApiService.getAllBots(req);
  //     res.status(result.status).send(result);
  //   } catch (error) {
  //     console.error(error);
  //     res.redirect("/dashboard");
  //   }
  // }

  // @Post("store")
  // @UseInterceptors(AnyFileInterceptor("user"))
  // async userStore(
  //   @UploadedFiles() files: Express.Multer.File[],
  //   @Body() dto: BotCreateQueryDto,
  //   @Req() req: Request,
  //   @Res() res: Response
  // ) {
  //   try {
  //     const result = await this.userApiService.botCreateFromAdmin(dto, files);
  //     result.success && res.redirect("/bots/list");
  //     !result.success && res.redirect("/bots/list");
  //   } catch (error) {
  //     console.error(error);
  //     res.redirect("/");
  //   }
  // }

  // @Post("change-password")
  // async userChangePasswordSubmit(
  //   @Body() dto: ChangePwdDTO,
  //   @Req() req: Request,
  //   @Res() res: Response
  // ) {
  //   try {
  //     const result = await this.userApiService.userChangePasswordSubmit(dto);

  //     res.redirect("/users/view/" + dto.id);
  //   } catch (error) {
  //     console.error(error);
  //     res.redirect("/");
  //   }
  // }

  // @Get("status-change/:id")
  // async statusChange(@Req() req: Request, @Res() res: Response) {
  //   try {
  //     const result = await this.userApiService.statusChange(
  //       req.params.id,
  //       req.query.status as string
  //     );
  //     req.query.path
  //       ? res.redirect(<string>req.query.path)
  //       : res.redirect("/bots/list");
  //   } catch (error) {
  //     console.error(error);
  //     res.redirect("/");
  //   }
  // }

  // @Get("delete/:id")
  // async deleteAccount(@Req() req: Request, @Res() res: Response) {
  //   try {
  //     const result = await this.userApiService.deleteAccount(req.params.id);
  //     res.redirect("/bots/list");
  //   } catch (error) {
  //     console.error(error);
  //     res.redirect("/");
  //   }
  // }

  // @Post("update")
  // @UseInterceptors(AnyFileInterceptor("user"))
  // async userAccountUpdate(
  //   @UploadedFiles() files: Express.Multer.File[],
  //   @Body() dto: UserUpdateFromAdminDTO,
  //   @Req() req: Request,
  //   @Res() res: Response
  // ) {
  //   try {
  //     const result = await this.userApiService.userUpdateFromAdmin(dto, files);
  //     res.redirect("/bots/view/" + dto.id);
  //   } catch (error) {
  //     console.error(error);
  //     res.redirect("/");
  //   }
  // }

  // @Post("bulk/delete")
  // async bulkDelete(
  //   @Body() dto: IdArrayDTO,
  //   @Req() req: Request,
  //   @Res() res: Response
  // ) {
  //   try {
  //     const result = await this.userApiService.bulkRemove(dto);
  //     if (result.success) {
  //       res
  //         .status(200)
  //         .send({ status: 200, data: result.data, message: result.message });
  //     } else {
  //       res
  //         .status(400)
  //         .send({ status: 400, data: result.data, message: result.message });
  //     }
  //   } catch (error) {
  //     res.status(500).send({ status: 500, data: {}, message: error.message });
  //   }
  // }
}