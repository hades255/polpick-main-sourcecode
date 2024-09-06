import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  ChangellyExchange,
  ChangellySchema,
} from "./schema/changelly-exchange.schema";
import { ChangellyApiController } from "./changelly-api.controller";
import { ChangellyService } from "./changelly.service";

@Global()
@Module({
  exports: [ChangellyService],
  providers: [ChangellyService],
  controllers: [ChangellyApiController],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: ChangellyExchange.name,
        useFactory: () => {
          return ChangellySchema;
        },
      },
    ]),
  ],
})
export class ChangellyExchangeModule {}
