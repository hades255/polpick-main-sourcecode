import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber } from "class-validator";
import { Types } from "mongoose";

export class UserDeviceListingDto {
    @ApiProperty({ required: false, default: 1 })
    @IsOptional()
    @IsNumber()
    page?: number;

    @ApiProperty({ required: false, default: 10 })
    @IsOptional()
    @IsNumber()
    limit?: number;

    @IsOptional()
    user_id: string | Types.ObjectId
}