import { Module } from "@nestjs/common";
import { AffiliateLinkApiController } from "./affiliate-link-api.controller";
import { AffiliateLinkService } from "./affiliate-link.service";

@Module({
    imports: [],
    controllers: [AffiliateLinkApiController],
    exports: [AffiliateLinkService],
    providers: [AffiliateLinkService]
})
export class AffiliateLinkModule {}