import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserDevice, UserDeviceDocument } from "../schemas/user-device.schema";
import { AggregatePaginateModel, AggregatePaginateResult, FilterQuery, Model, Types } from "mongoose";
import { UserDeviceListingDto } from "../dto/user-devices.dto";
import { BaseRepository } from "src/common/base/base.repository";

@Injectable()
export class UserDeviceRepository extends BaseRepository<UserDeviceDocument> {
    constructor(
        @InjectModel(UserDevice.name) private userDeviceModel: Model<UserDeviceDocument>,
        @InjectModel(UserDevice.name) private userDeviceAggregateModel: AggregatePaginateModel<UserDeviceDocument>) {
        super(userDeviceModel, userDeviceAggregateModel);
    }

    async getAllDevicesPaginated(paginatedDto: UserDeviceListingDto, token?: string): Promise<AggregatePaginateResult<UserDeviceDocument>> {
        try {
            let conditions = {};
            let and_clauses = [];

            and_clauses.push({ isDeleted: false, expired: false, user_id: new Types.ObjectId(paginatedDto.user_id) });

            conditions['$and'] = and_clauses;

            const aggregate = this.userDeviceModel.aggregate([
                { $match: conditions },
                {
                    $project: {
                        user_id: '$user_id',
                        deviceToken: '$deviceToken',
                        deviceType: '$deviceType',
                        ip: '$ip',
                        ip_lat: '$ip_lat',
                        ip_long: '$ip_long',
                        browserInfo: '$browserInfo',
                        deviceInfo: '$deviceInfo',
                        operatingSystem: '$operatingSystem',
                        last_active: '$last_active',
                        state: '$state',
                        country: '$country',
                        city: '$city',
                        timezone: '$timezone',
                        access_token: '$access_token',
                        expired: '$expired',
                        role: '$role',
                        isDeleted: '$isDeleted',
                        isCurrent: { $eq: ['$access_token', token] }
                    }
                },
                { $sort: { _id: -1 } }
            ])


            const options = { page: paginatedDto.page, limit: paginatedDto.limit };
            return await this.userDeviceAggregateModel.aggregatePaginate(aggregate, options);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}