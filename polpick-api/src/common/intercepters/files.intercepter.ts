import { BadRequestException } from "@nestjs/common";
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";

/* For Single Image File Intercepting */
export const ImageFileInterceptor = (fieldName: string, directory: string) => FileInterceptor(fieldName, {
    storage: diskStorage({
        destination(req, file, callback) {
            if (!existsSync(`./public/uploads/${directory}`)) {
                mkdirSync(`./public/uploads/${directory}`)
            }
            callback(null, `./public/uploads/${directory}`)
        },
        filename(req, file, callback) {
            callback(null, Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
        },
    }),
    fileFilter(req, file, callback) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            callback(null, true)
        } else {
            callback(new BadRequestException('Invalid file type. Only Excel files are allowed.'), false);
        }
    }
})

/* For Multiple & Every Types of File Intercepting */
export const AnyFileInterceptor = (directory: string) => AnyFilesInterceptor({
    storage: diskStorage({
        destination(req, file, callback) {
            if (!existsSync(`./public/uploads/${directory}`)) {
                mkdirSync(`./public/uploads/${directory}`)
            }
            callback(null, `./public/uploads/${directory}`)
        },
        filename(req, file, callback) {
            callback(null, Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
        },
    })
})