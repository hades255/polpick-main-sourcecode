import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Types } from "mongoose"

export class CMSUpdateDTO {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    content: string

    @IsOptional()
    id: string | Types.ObjectId
}