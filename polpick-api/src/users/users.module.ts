import { Module } from "@nestjs/common";
import { AdminApiController } from "./controllers/admin-api.controller";
import { AdminApiService } from "./services/admin-api.service";
import { UsersApiController } from "./controllers/users-api.controller";
import { UsersApiService } from "./services/users-api.service";

@Module({
  imports: [],
  controllers: [UsersApiController],
  providers: [UsersApiService],
})
export class UsersModule {}
