import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Roller, RollerSchema } from "../schema/high-roller.schema";
import { RollerRepo } from "./roller.repository";
@Global()
@Module({
    exports: [RollerRepo],
    providers: [RollerRepo],
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Roller.name,
                useFactory: () => {
                    return RollerSchema;
                }
            }
        ]),

    ]
})
export class RollerRepoModule {}