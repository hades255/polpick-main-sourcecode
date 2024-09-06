import { Logger, Module } from '@nestjs/common';
import { HelperService } from 'src/helpers/game.helper';
import { WeeklyController } from './weekly-api.controller';
import { WeeklyService } from './service/weekly.service';



@Module({
    imports: [],
    controllers: [WeeklyController],
    providers: [WeeklyService, HelperService, Logger],
    exports: []
})
export class WeeklyModule { }
