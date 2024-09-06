import { Logger, Module } from '@nestjs/common';
import { RollerService } from './service/roller.service';
import { RollerController } from './roller-api.controller';


@Module({
    imports: [],
    controllers: [RollerController],
    providers: [RollerService, Logger],
    exports: []
})
export class RollerModule {
    
}


