import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { OrdersRepository } from "src/order/repository/order.repository";
import { IMakeTrade } from "./interface/websocket.interface";

@Injectable()
export class SocketService {
    constructor(
        private readonly orderRepository: OrdersRepository
    ) { }
}