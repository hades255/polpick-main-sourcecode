import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FAQ, FAQSchema } from "../schemas/faq.schema";
import { FAQRepository } from "./faq.repository";
import { FAQCategorySchema, FAQCategory } from "../schemas/faq-category.schema";
import { FAQCategoryRepository } from "./faq-category.repository";


@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: FAQ.name, schema: FAQSchema },
            { name: FAQCategory.name, schema: FAQCategorySchema },
        ])
    ],
    exports: [FAQRepository, FAQCategoryRepository],
    providers: [FAQRepository, FAQCategoryRepository]
})
export class FAQRepositoryModule { }