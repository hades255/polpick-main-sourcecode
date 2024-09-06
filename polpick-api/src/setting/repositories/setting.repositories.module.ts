import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Setting, SettingSchema } from "../schemas/setting.schema";
import { SettingRepository } from "./setting.repositories";



@Global()
@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
              name: Setting.name,
              useFactory: () => {
                const schema = SettingSchema;
                return schema;
              },
            },
        ])
    ],
    controllers: [],
    providers: [SettingRepository],
    exports: [SettingRepository]
})
export class SettingRepositoryModule {}