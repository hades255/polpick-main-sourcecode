import { Global, Module } from "@nestjs/common";
import { UserDeviceRepository } from "./user-device.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { UserDevice, UserDeviceSchema } from "../schemas/user-device.schema";

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([{ name: UserDevice.name, schema: UserDeviceSchema }])
    ],
    providers: [UserDeviceRepository],
    exports: [UserDeviceRepository]
})
export class UserDeviceRepositoryModule {}