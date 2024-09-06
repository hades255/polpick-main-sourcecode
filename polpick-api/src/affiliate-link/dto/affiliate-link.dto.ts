import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class ListAffiliateLinkDto {
    @IsNotEmpty()
    @ApiProperty({ type: 'string' })
    walletId: string;

    @IsOptional()
    @IsObject()
    @ApiProperty({ required: false, default: { order: 'asc', field: 'createdAt' }, properties: { order: { type: 'string', enum: ['asc', 'desc'] }, field: { type: 'string', enum: ['createdAt', 'total_affiliated_users'] } } })
    sort?: { field: string, order: "asc" | "desc" };

    @ApiProperty({ required: false, default: 1 })
    @IsOptional()
    @IsNumber()
    page?: number;

    @ApiProperty({ required: false, default: 10 })
    @IsOptional()
    @IsNumber()
    limit?: number;
}

export class CreateAffiliateLinkDto {
    @ApiProperty({ type: 'string' })
    @IsOptional()
    link_name: string;

    @ApiProperty({ type: 'string' })
    @IsOptional()
    walletId: string;
}


export class CheckAffiliateLinkDto {
    @ApiProperty({ type: 'string' })
    @IsString()
    affiliate_link: string;
}

export class LinkAvailabilityDto {
    @ApiProperty({ type: 'string' })
    @IsNotEmpty()
    link_name: string;
}

export class AffiliateListDto {
    @ApiProperty({ type: 'string' })
    @IsString()
    walletId: string

    @ApiProperty({ type: 'number' })
    @IsNumber()
    year: number
}


export class AffiliateListWeeklyDto {
    @ApiProperty({ type: 'string' })
    @IsString()
    walletId: string

    @ApiProperty({ type: 'string' })
    @IsString()
    date: string
}



export class AffiliateListMonthDto {
    @ApiProperty({ type: 'string' })
    @IsString()
    walletId: string

    @ApiProperty({ type: 'number' })
    @IsNumber()
    year: number

    @ApiProperty({ type: 'number' })
    @IsNumber()
    month: number
}


export class AffiliateListDayWiseDto {
    @ApiProperty({ type: 'string' })
    @IsString()
    walletId: string

    @ApiProperty({ type: 'number' })
    @IsNumber()
    year: number

    @ApiProperty({ type: 'number' })
    @IsNumber()
    month: number


    @ApiProperty({ type: 'number' })
    @IsNumber()
    date: number
}

export class CreateAffiliateUserDto {
    @ApiProperty({ type: 'string' })
    @IsOptional()
    full_name: string;

    @ApiProperty({ type: 'string' })
    @IsOptional()
    email: string;

    // @ApiProperty({ type: 'string' })
    // @IsOptional()
    // countryCode: string;

    // @ApiProperty({ type: 'string' })
    // @IsOptional()
    // phone: string;

    @ApiProperty({ type: 'string' })
    @IsOptional()
    telegramId: string;

    @ApiProperty({ type: 'string' })
    @IsOptional()
    walletId: string;

    @ApiProperty({ type: 'boolean' })
    @IsOptional()
    terms_and_conditions: boolean;
}


export class ClicksRegistered {
    @ApiProperty({ type: 'string' })
    @IsString()
    affiliate_link: string
}


export class UpdateAffiliateLinkDto extends CreateAffiliateLinkDto { }