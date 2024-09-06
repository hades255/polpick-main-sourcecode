import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {  WeeklyRepo } from "./weekly.repository";
import { Weekly, WeeklySchema } from "../schema/weekly.schema";

@Global()
@Module({
    exports: [WeeklyRepo],
    providers: [WeeklyRepo],
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Weekly.name,
                useFactory: () => {
                    return WeeklySchema;
                }
            }
        ]),

    ]
})
export class WeeklyRepoModule {}