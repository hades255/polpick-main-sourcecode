import { InjectModel } from "@nestjs/mongoose";
import { AggregatePaginateModel, AggregatePaginateResult, FilterQuery, Model, SortOrder } from "mongoose";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as _ from 'underscore';
import { Request } from "express";
import { UserActivityTimeline, UserActivityTimelineDocument } from "../schemas/user-activity-timeline.schema";
import { BaseRepository } from "src/common/base/base.repository";

@Injectable()
export class UserActivityTimelineRepository extends BaseRepository<UserActivityTimelineDocument> {
    constructor(
        @InjectModel(UserActivityTimeline.name) private UserActivtyModel: Model<UserActivityTimelineDocument>,
        @InjectModel(UserActivityTimeline.name) private UserActivtyModelPaginated: AggregatePaginateModel<UserActivityTimelineDocument>
    ) {
        super(UserActivtyModel, UserActivtyModelPaginated);
    }

    async getAllRoles(req: Request): Promise<AggregatePaginateResult<UserActivityTimelineDocument>> {
        try {
            let conditions = {};
            let and_clauses = [];

            and_clauses.push({ "roleGroup": req.body.roleGroup, "isDeleted": false });
            and_clauses.push({ 'role': { $ne: 'admin' } })

            if (_.isObject(req.body.search) && _.has(req.body.search, 'value')) {
                and_clauses.push({
                    $or: [
                        { 'roleDisplayName': { $regex: req.body.search.value.trim(), $options: 'i' } },
                        { 'desc': { $regex: req.body.search.value.trim(), $options: 'i' } }
                    ]
                });
            }

            conditions['$and'] = and_clauses;

            let sortOperator = { "$sort": {} };
            if (_.has(req.body, 'order') && req.body.order.length) {
                for (let order of req.body.order) {
                    let sortField = req.body.columns[+order.column].data;
                    if (order.dir == 'desc') {
                        var sortOrder = -1;
                    } else if (order.dir == 'asc') {
                        var sortOrder = 1;
                    }
                    sortOperator["$sort"][sortField] = sortOrder;
                }
            } else {
                sortOperator["$sort"]['_id'] = -1;
            }

            let aggregate = this.UserActivtyModel.aggregate([
                { $match: conditions },
                sortOperator
            ]);

            const options = { page: req.body.page, limit: req.body.length };
            const allDatas = await this.UserActivtyModelPaginated.aggregatePaginate(aggregate, options);
            return allDatas;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getAllByFieldWithSortAndLimit(params: FilterQuery<UserActivityTimelineDocument>, sort: { [key: string]: SortOrder }, limit: number) {
        try {
            let datas = await this.UserActivtyModelPaginated.find(params).sort(sort).limit(limit).exec();
            return datas;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}