import { Global, Module } from '@nestjs/common';
import { RoleRepository } from './repositories/role.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './schemas/role.schema';

@Global()
@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Role.name,
                useFactory: () => {
                    return RoleSchema
                }
            }
        ])
    ],
    controllers: [],
    providers: [RoleRepository],
    exports: [RoleRepository]
})
export class RoleModule {}