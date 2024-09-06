import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AffiliateLink, AffiliateLinkSchema } from "../schemas/affiliate-link.schema";
import { Click, ClickSchema } from "../schemas/click-count.schema";

import { AffiliateLinkRepository } from "./affiliate-link.repository";

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([{ name: AffiliateLink.name, schema: AffiliateLinkSchema }]),
        MongooseModule.forFeature([{ name: Click.name, schema: ClickSchema }])
    ],
    providers: [AffiliateLinkRepository],
    exports: [AffiliateLinkRepository]
})
export class AffiliateLinkRepositoryModule {}