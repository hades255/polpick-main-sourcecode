import { Global, Logger, Module } from "@nestjs/common";
import { SocketGateway } from "./websocket.gateway";
import { SocketService } from "./websocket.service";

@Global()
@Module({
    providers: [
        SocketService,
        SocketGateway,
        Logger
    ],
    exports: [SocketGateway]
})
export class WebsocketModule {}