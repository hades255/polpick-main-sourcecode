import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserActivityTimeline, UserActivityTimelineSchema } from './schemas/user-activity-timeline.schema';
import { UserActivityTimelineRepository } from './repositories/user-activity-timeline.repository';

@Global()
@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: UserActivityTimeline.name,
                useFactory: () => {
                    return UserActivityTimelineSchema
                }
            }
        ])
    ],
    controllers: [],
    providers: [UserActivityTimelineRepository],
    exports: [UserActivityTimelineRepository]
})
export class UserActivityTimelineModule {}