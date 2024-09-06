import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Types } from "mongoose"

export class FAQUpdateDTO {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsOptional()
    id: string | Types.ObjectId
}