import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Request } from 'express';
import * as _ from 'underscore';
import { FAQRepository } from '../repositories/faq.repository';
import { ApiResponseType } from 'src/common/types/api-response.type';
import { FAQCategoryRepository } from '../repositories/faq-category.repository';


@Injectable()
export class FAQService {
    constructor(
        private faqRepository: FAQRepository,
        private faqCategoryRepo: FAQCategoryRepository
    ) { }

    async list(req: Request): Promise<ApiResponseType> {
        try {
            const data = await this.faqRepository.getAllFaq(req);

            if (data) return { success: true, message: "FAQs fetched successfully!", data: data };
            return { success: false, message: "Nothing found!", data: [] };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    };

    async getCategories() {
        try {
            const data = await this.faqCategoryRepo.getAllByFieldWithProjection({ isDeleted: false }, { isDeleted: 0 });

            if (data) return { success: true, message: "Categories fetched successfully!", data: data };
            return { success: false, message: "Nothing found!", data: [] };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

}
