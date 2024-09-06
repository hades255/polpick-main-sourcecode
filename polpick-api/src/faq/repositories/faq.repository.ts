import { InjectModel } from "@nestjs/mongoose";
import { AggregatePaginateModel, Model, Types, isValidObjectId } from "mongoose";
import { Injectable } from "@nestjs/common";
import * as _ from 'underscore';
import { FAQDocument, FAQ } from "../schemas/faq.schema";
import { BaseRepository } from "src/common/base/base.repository";
import { Request } from "express";

@Injectable()
export class FAQRepository extends BaseRepository<FAQDocument> {
    constructor(
        @InjectModel(FAQ.name) private FaqModel: Model<FAQDocument>,
        @InjectModel(FAQ.name) private FaqModelPaginated: AggregatePaginateModel<FAQDocument>
    ) {
        super(FaqModel, FaqModelPaginated);
    }

    async getAllFaq(req: Request): Promise<FAQDocument[]> {
        try {
            let conditions = {};
            let and_clauses = [];

            and_clauses.push({ "isDeleted": false });

            if(req.body.category_id && isValidObjectId(req.body.category_id)) {
                and_clauses.push({ category_id: new Types.ObjectId(req.body.category_id) });
            }

            if (req.body.search) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: req.body.search.trim(), $options: 'i' } }
                    ]
                });
            }

            conditions['$and'] = and_clauses;

            let aggregate = await this.FaqModel.aggregate([
                { $match: conditions }
            ]);

            return aggregate;
        } catch (error) {
            return error;
        }
    }

}