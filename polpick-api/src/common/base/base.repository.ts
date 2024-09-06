import { InternalServerErrorException } from "@nestjs/common";
import { AggregatePaginateModel, FilterQuery, FlattenMaps, Model, ProjectionFields, Types, UpdateQuery } from "mongoose";
import mongodb = require('mongodb');

export class BaseRepository<T> {
    model: Model<T>;
    aggregateModel: AggregatePaginateModel<T>;

    constructor(model: Model<T>, aggregateModel: AggregatePaginateModel<T>) {
        this.model = model;
        this.aggregateModel = aggregateModel;
    }

    async getAll(params: FilterQuery<T>): Promise<T[]> {
        try {
            return await this.model.find(params).lean();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getAllByField(params: FilterQuery<T>): Promise<T[]> {
        try {
            return await this.model.find(params);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getByField(params: FilterQuery<T>): Promise<T> {
        try {
            return await this.model.findOne(params).exec();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getByFieldLatest(params: FilterQuery<T>): Promise<T> {
        try {
            return await this.model.findOne(params).sort({ _id: -1 }).exec();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getById(id: Types.ObjectId): Promise<T> {
        try {
            return await this.model.findById(id).exec();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getCountByParam(params: FilterQuery<T>): Promise<number> {
        try {
            return await this.model.countDocuments(params);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async save(body: Partial<T>): Promise<T> {
        try {
            return await this.model.create(body);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async updateById(data: Partial<T>, id: Types.ObjectId): Promise<T> {
        try {
            return await this.model.findByIdAndUpdate(id, data, {
                new: true
            });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getDistinctDocument(field: string, params: FilterQuery<T>): Promise<unknown[]> {
        try {
            return await this.model.distinct(field, params);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getAllByFieldWithProjection(params: FilterQuery<T>, projection: ProjectionFields<T>, limit?: number): Promise<FlattenMaps<T>[]> {
        try {
            return await this.model.find(params, projection, { limit }).lean().exec();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getByFieldWithProjection(params: FilterQuery<T>, projection: ProjectionFields<T>): Promise<FlattenMaps<T>> {
        try {
            return await this.model.findOne(params, projection).lean().exec();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getDistinctDocumentCount(field: string, params: FilterQuery<T>): Promise<number> {
        try {
            let datasCount = await this.model.distinct(field, params);
            if (!datasCount) {
                return 0;
            }
            return datasCount.length;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async delete(id: any): Promise<mongodb.DeleteResult> {
        try {
            return await this.model.deleteOne({ _id: id }).exec();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async bulkDelete(params: FilterQuery<T>): Promise<mongodb.DeleteResult> {
        try {
            return await this.model.deleteMany(params);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async updateByField(data: UpdateQuery<T>, param: FilterQuery<T>): Promise<any> {
        try {
            return await this.model.updateOne(param, data, { new: true });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async updateAllByParams(data: UpdateQuery<T>, params: FilterQuery<T>): Promise<any> {
        try {
            return await this.model.updateMany(params, data, { new: true });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async bulkDeleteSoft(ids: any[]): Promise<any> {
        try {
            let result = await this.model.updateMany(
                { _id: { $in: ids } },
                { $set: { isDeleted: true } },
                { multi: true }
            )
            if (!result) {
                return null;
            }
            return result;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}