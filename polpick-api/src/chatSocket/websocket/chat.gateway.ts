import { Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConnectedSocket, MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

import { ChatHistory } from './interface/chat.interface';
import * as moment from 'moment';
import { ChatService } from './chat.service';

import { OrdersRepository } from 'src/order/repository/order.repository';

@WebSocketGateway(1749, { cors: true, transports: ['websocket'] })
export class ChatGateway implements OnGatewayInit {

    private chat_history: ChatHistory[] = [];


    constructor(
        private readonly configService: ConfigService,
        private readonly socketService: ChatService,
        private readonly logger: Logger,

    ) {

    }

    @WebSocketServer()
    io: Server;

    afterInit(server: Server) {
        this.logger.debug('Chat socket initialized.');
    }


    @SubscribeMessage('chatMessage')
    handleChatMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: ChatHistory) {
        this.chat_history.push(payload);
        console.log("**************CHAT ", payload)
        this.io.emit('newMessage', payload);
    }


}

