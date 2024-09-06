import { Global, Module } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Users, UsersSchema } from "../schemas/users.schema";

@Global()
@Module({
    exports: [UserRepository],
    providers: [UserRepository],
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Users.name,
                useFactory: () => {
                    return UsersSchema;
                }
            }
        ])
    ]
})
export class UserRepositoryModule {}