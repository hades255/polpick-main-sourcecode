import { InjectModel } from "@nestjs/mongoose";
import { AggregatePaginateModel, AggregatePaginateResult, FilterQuery, Model, Types } from "mongoose";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as _ from 'underscore';
import { RoleDocument, Role } from "../schemas/role.schema";
import mongodb = require('mongodb');
import { Request } from "express";
import { BaseRepository } from "src/common/base/base.repository";

@Injectable()
export class RoleRepository extends BaseRepository<RoleDocument> {
    constructor(
        @InjectModel(Role.name) private RoleModel: Model<RoleDocument>,
        @InjectModel(Role.name) private RoleModelPaginated: AggregatePaginateModel<RoleDocument>
    ) {
        super(RoleModel, RoleModelPaginated);
    }

    async getAllRoles(req: Request): Promise<AggregatePaginateResult<RoleDocument>> {
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

            let aggregate = this.RoleModel.aggregate([
                { $match: conditions },
                sortOperator
            ]);

            const options = { page: req.body.page, limit: req.body.length };
            const allDatas = await this.RoleModelPaginated.aggregatePaginate(aggregate, options);
            return allDatas;
        } catch (error) {
            return error;
        }
    }
}