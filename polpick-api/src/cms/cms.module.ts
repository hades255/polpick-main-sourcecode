import { Module } from '@nestjs/common';
import { CmsController } from './cms.controller';
import { CmsService } from './services/cms.service';
import { CmsApiController } from './cms-api.controller';

@Module({
    imports: [],
    controllers: [CmsController, CmsApiController],
    providers: [CmsService],
    exports: [CmsService]
})
export class CmsModule { }