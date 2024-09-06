import { UsersModule } from "./users/users.module";
import { RoleModule } from "./role/role.module";
import { Logger, Module } from "@nestjs/common";
import { HelpersModule } from "./helpers/helpers.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UserRepositoryModule } from "./users/repositories/user-repository.module";
import { UserActivityTimelineModule } from "./user-activity-timeline/user-activity-timeline.module";
import { CmsModule } from "./cms/cms.module";
import { CmsRepositoryModule } from "./cms/repositories/cms-repository.module";
import { WebsocketModule } from "./websocket/websocket.module";
import { GameModule } from "./game/game.module";
import { GameRepositoryModule } from "./game/repository/game-repository.module";
import { RollerRepoModule } from "./high-rollers/repository/roller-repo.module";
import { RollerModule } from "./high-rollers/roller.module";
import { OrderModule } from "./order/order.module";
import { OrderRepositoryModule } from "./order/repository/order-repository.module";
import { WeeklyRepoModule } from "./weekly-timeline/repository/weekly-repo.module";
import { WeeklyModule } from "./weekly-timeline/weekly.module";
import { AffiliateLinkRepositoryModule } from "./affiliate-link/repositories/affiliate-link-repository.module";
import { ScheduleModule } from "@nestjs/schedule";
import { TransactionRepositoryModule } from "./transactions/repositories/transactions-repository.module";
import { JackpotHistoryRepositoryModule } from "./jackpot-history/repository/jackpot-history-repository.module";
import { AffiliateLinkModule } from "./affiliate-link/affiliate-link.module";
import { FAQModule } from "./faq/faq.module";
import { FAQRepositoryModule } from "./faq/repositories/faq-repository.module";
import { ContractModule } from "./contract/contract.module";
import { CacheModule } from "@nestjs/cache-manager";
import { ChangellyExchangeModule } from "./changelly/changelly.module";
import { ChatModule } from "./chatSocket/websocket/chat.module";
import { TicketRepositoryModule } from "./tickets/repository/tickets-repository.module";
import { TradingModule } from "./trading/trading.module";
import { TradingRepositoryModule } from "./trading/repositories/trading-repository.module";
import { ChangellyExchangeRepositoryModule } from "./changelly/repositories/changelly-exchange-repository.module";
import { UserDeviceRepositoryModule } from "./user-devices/repository/user-device-repository.module";
import { SettingModule } from "./setting/setting.module";
import { SettingRepository } from "./setting/repositories";
import { SettingRepositoryModule } from "./setting/repositories/setting.repositories.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    CacheModule.register({ 
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.DB_URI,
      {
        auth: {
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
        },
      }
    ),
    AuthModule,
    RoleModule,
    HelpersModule,
    UsersModule,
    UserDeviceRepositoryModule,
    UserRepositoryModule,
    UserActivityTimelineModule,
    CmsModule,
    CmsRepositoryModule,
    WebsocketModule,
    ChatModule,
    GameModule,
    GameRepositoryModule,
    RollerRepoModule,
    RollerModule,
    OrderModule,
    OrderRepositoryModule,
    WeeklyRepoModule,
    WeeklyModule,
    TransactionRepositoryModule,
    AffiliateLinkRepositoryModule,
    TransactionRepositoryModule,
    JackpotHistoryRepositoryModule,
    AffiliateLinkModule,
    FAQRepositoryModule,
    FAQModule,
    ContractModule,
    ChangellyExchangeModule,
    ChangellyExchangeRepositoryModule,
    TicketRepositoryModule,
    TradingModule,
    TradingRepositoryModule,
    SettingModule,
    SettingRepositoryModule
  ],
  providers: [
    ConfigService,
    Logger,
  ],
})
export class AppModule { }
