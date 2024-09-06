import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { OrdersRepository } from "src/order/repository/order.repository";

@Injectable()
export class ChatService {
    constructor(
        private readonly orderRepository: OrdersRepository
    ) { }
}