import { Global, Logger, Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { ChatService } from "./chat.service";

@Global()
@Module({
    providers: [
        ChatService,
        ChatGateway,
        Logger
    ],
    exports: [ChatGateway]
})
export class ChatModule {}