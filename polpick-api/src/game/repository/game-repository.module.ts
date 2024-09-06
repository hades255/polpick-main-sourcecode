import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GameHistoryRepository } from "./game-history.repository";
import { GameHistory, GameHistorySchema } from "../schemas/game-history.schema";
import { GameCurrent, GameCurrentSchema } from "../schemas/game-current.schema";
import { GameCurrentRepository } from "./game-current.repository";

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: GameHistory.name, schema: GameHistorySchema },
            { name: GameCurrent.name, schema: GameCurrentSchema },
        ]),
    ],
    providers: [GameHistoryRepository, GameCurrentRepository],
    exports: [GameHistoryRepository, GameCurrentRepository],
})
export class GameRepositoryModule { }