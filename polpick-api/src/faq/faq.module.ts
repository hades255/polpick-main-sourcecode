import { Module } from '@nestjs/common';
import { FAQService } from './services/faq.service';
import { FAQApiController } from './faq-api.controller';

@Module({
    imports: [],
    controllers: [FAQApiController],
    providers: [FAQService],
    exports: [FAQService]
})
export class FAQModule { }