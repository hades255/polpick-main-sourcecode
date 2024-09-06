const mongoose = require('mongoose');
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'underscore';
import { Setting, SettingDocument } from '../schemas/setting.schema';
import { AggregatePaginateModel, Model } from 'mongoose';

@Injectable()
export class SettingRepository {
    constructor(
        @InjectModel(Setting.name) private settingModel: Model<SettingDocument>,
        @InjectModel(Setting.name) private settingModelPaginated: AggregatePaginateModel<SettingDocument>
    ) { }

    async getAllByField(params: any): Promise<any> {
        try {
            return await this.settingModel.find(params).exec();
        } catch (error) {
            return error;
        }
    }

    async getAllByFieldWithProjection(params: any, projection: any): Promise<any> {
        try {
            return await this.settingModel.find(params, projection).exec();
        } catch (error) {
            return error;
        }
    }

    async getByField(params: any): Promise<any> {
        try {
            return await this.settingModel.findOne(params).exec();
        } catch (error) {
            return error;
        }
    }

    async getByFieldWithProjection(params: any, projection: any): Promise<any> {
        try {
            return await this.settingModel.findOne(params, projection).exec();
        } catch (error) {
            return error;
        }
    }

    async getById(id: any): Promise<any> {
        try {
            return await this.settingModel.findById(id).exec();
        } catch (error) {
            return error;
        }
    }

    async getCountByParam(params: any): Promise<any> {
        try {
            return await this.settingModel.countDocuments(params);
        } catch (e) {
            return e;
        }
    }

    async save(body: any): Promise<any> {
        try {
            return await this.settingModel.create(body);
        } catch (error) {
            return error;
        }
    }

    async updateById(data: any, id: any): Promise<any> {
        try {
            return await this.settingModel.findByIdAndUpdate(id, data, {
                new: true
            });
        } catch (error) {
            return error;
        }
    }

    async getDistinctDocument(field: string, params: any) {
        try {
            let datas = await this.settingModel.distinct(field, params);
            if (!datas) {
                return null;
            }
            return datas;
        } catch (e) {
            return e;
        }
    }

    async getDistinctDocumentCount(field: string, params: any) {
        try {
            let datasCount = await this.settingModel.distinct(field, params);
            if (!datasCount) {
                return 0;
            }
            return datasCount.length;
        } catch (e) {
            return e;
        }
    }


    async bulkDelete(params: any) {
        try {
            let deleted = await this.settingModel.deleteMany(params);
            return true;
        } catch (e) {
            return e;
        }
    }

    async updateByField(data: any, param: any) {
        try {
            let datas = await this.settingModel.updateOne(param, data, {
                new: true,
            });
            if (!datas) {
                return null;
            }
            return datas;
        } catch (e) {
            return e;
        }
    }




    async findSetting(): Promise<any> {
        try {
            const data = await this.settingModel.aggregate([{ $limit: 1 }]);
            if (_.isEmpty(data)) {
                return null;
            }
            return data[0];
        } catch (error) {
            return error;
        }
    }

    async getAll(req: any): Promise<any> {
        try {
            let conditions = {};
            let and_clauses = [];

            and_clauses.push({ "isDeleted": false });

            if (_.isObject(req.body.search) && _.has(req.body.search, 'value')) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: req.body.search.value.trim(), $options: 'i' } },
                        { 'slug': { $regex: req.body.search.value.trim(), $options: 'i' } }
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

            let aggregate = this.settingModel.aggregate([
                { $match: conditions },
                sortOperator
            ]);

            const options = { page: req.body.page, limit: req.body.length };
            const allDatas = await this.settingModelPaginated.aggregatePaginate(aggregate, options);
            return allDatas;
        } catch (error) {
            return error;
        }
    }
}