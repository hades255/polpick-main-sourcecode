import { InjectModel } from "@nestjs/mongoose";
import { AggregatePaginateModel, Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import * as _ from 'underscore';
import { FAQCategoryDocument, FAQCategory } from "../schemas/faq-category.schema";
import { BaseRepository } from "src/common/base/base.repository";

@Injectable()
export class FAQCategoryRepository extends BaseRepository<FAQCategoryDocument> {
    constructor(
        @InjectModel(FAQCategory.name) private categoryModel: Model<FAQCategoryDocument>,
        @InjectModel(FAQCategory.name) private categoryPaginatedModel: AggregatePaginateModel<FAQCategoryDocument>
    ) {
        super(categoryModel, categoryPaginatedModel);
    }

}