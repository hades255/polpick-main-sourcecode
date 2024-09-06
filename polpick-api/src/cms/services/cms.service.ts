import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as _ from 'underscore';
import { CmsRepository } from '../repositories/cms.repository';
import { Types } from 'mongoose';
import { ApiResponseType } from 'src/common/types/api-response.type';
import { CMSUpdateDTO } from '../dto/cms.dto';
import { GameHistoryRepository } from 'src/game/repository/game-history.repository';


@Injectable()
export class CmsService {
    constructor(
        private cmsRepo: CmsRepository,
        private gameHistoryRepo: GameHistoryRepository,
    ) { }

    async getAll(req: Request): Promise<any> {
        try {
            const start = +req.body.start;
            const length = +req.body.length;
            let currentPage = 1;
            if (start > 0) {
                currentPage = Math.round((start + length) / length);
            }
            req.body.page = currentPage;
            let cmsData = await this.cmsRepo.getAllCms(req);

            let data = {
                "recordsTotal": cmsData.totalDocs,
                "recordsFiltered": cmsData.totalDocs,
                "data": cmsData.docs
            };
            return {
                status: 200,
                data: data,
                message: `Data fetched successfully.`
            };
        } catch (error) {
            console.error(error);
            return {
                status: 500,
                data: {
                    "recordsTotal": 0,
                    "recordsFiltered": 0,
                    "data": []
                },
                message: error.message
            };
        }
    };

    async update(body: CMSUpdateDTO, files: Express.Multer.File[]): Promise<ApiResponseType> {
        try {
            const cmsId = new Types.ObjectId(body.id);
            let cmsData = await this.cmsRepo.getByField({ 'title': body.title, _id: { $ne: cmsId }, isDeleted: false });
            if (_.isEmpty(cmsData)) {
                if (!body.content) {
                    return { success: false, data: {}, message: "Cms content is required." };
                } else {
                    // if (body.slug) {
                    //     body.slug = body.slug.replace(/\s/g, '');
                    //     let alreadyExist = await this.cmsRepo.getByField({ 'slug': body.slug, _id: { $ne: cmsId }, isDeleted: false });
                    //     if (alreadyExist) {
                    //         return { success: false, data: {}, message: "CMS is already availabe!" };
                    //     }
                    // }

                    if (files && files.length) {
                        for (let file of files) {
                            body[file.fieldname] = file.filename;
                        }
                    }

                    let cmsUpdate = await this.cmsRepo.updateById(body, cmsId);
                    if (cmsUpdate && cmsUpdate._id) {
                        return { success: true, data: {}, message: "CMS updated successfully" };
                    } else {
                        return { success: false, data: {}, message: "Failed to update CMS content!" };
                    }
                }
            } else {
                return { success: false, data: {}, message: "CMS is already availabe with same title!" };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: {}, message: error.message };
        }
    };

    async getBySlug(slug: string): Promise<ApiResponseType> {
        try {
            const data = await this.cmsRepo.getByFieldWithProjection({ slug: slug, isDeleted: false }, { _id: 0, title: 1, content: 1, image: 1 });
            if (data) return { success: true, type: 'success', message: "CMS fetched successfully!", data };
            return { success: false, data: {}, message: "No such page found!" };
        } catch (error) {
            return { success: false, data: {}, message: error.message };
        }
    };

    async listAllSlug(): Promise<ApiResponseType> {
        try {
            const data = await this.cmsRepo.getAllByFieldWithProjection({ status: 'Active', isDeleted: false }, { _id: 0, slug: 1, title: 1 });
            if (data) return { success: true, type: 'success', message: "CMS slugs fetched successfully!", data };
            return { success: false, type: 'error', message: "Nothing found!", data: [] };
        } catch (error) {
            return { success: false, type: 'error', message: error.message, data: [] };
        }
    };

    async list(): Promise<ApiResponseType> {
        try {
            const data = await this.cmsRepo.getAll({})

            if (data) return { success: true, type: 'success', message: "CMS Data fetched successfully!", data: data[0] };
            return { success: false, type: 'error', message: "Nothing found!", data: [] };
        } catch (error) {
            return { success: false, type: 'error', message: error.message, data: [] };
        }
    };

}
