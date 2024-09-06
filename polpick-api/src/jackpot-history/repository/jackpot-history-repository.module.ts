import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JackpotHistory, JackpotHistorySchema } from "../schema/jackpot-history.schema";
import { JackpotHistoryRepository } from "./jackpot-history.repository";


@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: JackpotHistory.name, schema: JackpotHistorySchema },
        ]),
    ],
    providers: [JackpotHistoryRepository],
    exports: [JackpotHistoryRepository],
})
export class JackpotHistoryRepositoryModule { }