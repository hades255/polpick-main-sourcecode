import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { TicketRepository } from "./tickets.repository";
import { Ticket, TicketSchema } from "../schemas/tickets.schema";

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Ticket.name, schema: TicketSchema }
        ])
    ],
    exports: [TicketRepository],
    providers: [TicketRepository]
})
export class TicketRepositoryModule { }