import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrdersRepository } from "./order.repository";
import { OrderSchema, Orders } from "../schemas/order.schema";

@Global()
@Module({
    exports: [OrdersRepository],
    providers: [OrdersRepository],
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Orders.name,
                useFactory: () => {
                    return OrderSchema;
                }
            }
        ]),

    ]
})
export class OrderRepositoryModule { }