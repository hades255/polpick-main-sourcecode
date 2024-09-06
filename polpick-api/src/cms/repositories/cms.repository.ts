import { InjectModel } from "@nestjs/mongoose";
import { AggregatePaginateModel, AggregatePaginateResult, Model } from "mongoose";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as _ from 'underscore';
import { Request } from "express";
import { CMSDocument, Cms } from "../schemas/cms.schema";
import { BaseRepository } from "src/common/base/base.repository";
import { ApiResponseType } from "src/common/types/api-response.type";

@Injectable()
export class CmsRepository extends BaseRepository<CMSDocument> {
    constructor(
        @InjectModel(Cms.name) private CmsModel: Model<CMSDocument>,
        @InjectModel(Cms.name) private CmsModelPaginated: AggregatePaginateModel<CMSDocument>
    ) {
        super(CmsModel, CmsModelPaginated);
    }

    async getAllCms(req: Request): Promise<AggregatePaginateResult<CMSDocument>> {
        try {
            let conditions = {};
            let and_clauses = [];
            
            and_clauses.push({ "isDeleted": false });

            if (_.isObject(req.body.search) && _.has(req.body.search, 'value')) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: req.body.search.value.trim(), $options: 'i' } },
                        { 'content': { $regex: req.body.search.value.trim(), $options: 'i' } }
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

            let aggregate = this.CmsModel.aggregate([
                { $match: conditions },
                sortOperator
            ]);

            const options = { page: req.body.page, limit: req.body.length };
            const allDatas = await this.CmsModelPaginated.aggregatePaginate(aggregate, options);
            return allDatas;
        } catch (error) {
            return error;
        }
    }

    async saveWinner(data: any[]): Promise<void> {
        try {
            const cmsInstance = new this.CmsModel();
            cmsInstance.TopWinnerData = data;
            
            const savedInstance = await cmsInstance.save();
            
            if (savedInstance) {
                console.log("Data saved successfully:", savedInstance);
            }
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async cmsList(): Promise<any[]>{
        try {
            const data = await this.CmsModel.aggregate([
                {
                    $project: {
                        win_ratio: 1,
                        win_paid: 1,
                        jackpot_paid: 1,
                        status: 1,
                        isDeleted: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        video_link: 1,
                        CmsData: {
                            $map: {
                                input: "$CmsData",
                                as: "item",
                                in: {
                                    title: "$$item.title",
                                    win_ratio: "$$item.win_ratio",
                                    winning_withdraw: "$$item.winning_withdraw",
                                    against_house: "$$item.against_house",
                                    win_chance: "$$item.win_chance",
                                    peer: "$$item.peer",
                                    transparency: "$$item.transparency",
                                    walletAddress: "$$item.walletAddress"
                                }
                            }
                        },
                        TopWinnerData: {
                            $map: {
                                input: "$TopWinnerData",
                                as: "item",
                                in: {
                                    rank: "$$item.rank",
                                    walletId: "$$item.walletId",
                                    avatarUrl: "$$item.avatarUrl",
                                    prize: "$$item.prize",
                                    createdAt: "$$item.createdAt",
                                    updatedAt: "$$item.updatedAt"
                                }
                            }
                        }
                    }
                }
            ]);

            if (data) {
                // If data is an array with a single object, extract that object
                const cmsData = Array.isArray(data) && data.length === 1 ? data[0] : data;
                return cmsData;
            } 
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
    
}