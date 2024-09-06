import { Global, Module } from '@nestjs/common';
import { MailerService } from './mailer.helper';
import { UtilsService } from './utils.helper';
import { HelperService } from './game.helper';
import { TransactionService } from './distribution';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/users/schemas/users.schema';
import { TicketHelper } from './ticket.helper';

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Users.name, schema: UsersSchema }
        ])
    ],
    providers: [
        MailerService,
        UtilsService,
        HelperService,
        TransactionService,
        TicketHelper
    ],
    exports: [
        MailerService,
        UtilsService,
        HelperService,
        TransactionService,
        TicketHelper
    ]
})
export class HelpersModule { }
