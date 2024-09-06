import { Logger, Module } from '@nestjs/common';
import { GameService } from './service/game-history.service';
import { GameController } from './game-api.controller';

@Module({
    imports: [],
    controllers: [GameController],
    providers: [GameService, Logger],
    exports: []
})
export class GameModule {

}


