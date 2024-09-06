import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNumber, IsObject, IsOptional, ValidateIf } from "class-validator";
import { DurationFilterTypes } from "src/common/enums/graph.enum";
import { IPagination } from "src/common/interfaces/pagination.interface";

export class UserGraphActivityDto {
    @ValidateIf((o) => !o?.start_date && !o?.end_date)
    @IsEnum(DurationFilterTypes)
    @ApiProperty({ type: 'string', enum: [Object.keys(DurationFilterTypes)] })
    duration_type: DurationFilterTypes;

    @ValidateIf((o) => !o.duration_type)
    @IsDateString()
    @ApiProperty({ type: 'string', example: 'YYYY-MM-DD' })
    start_date: string;

    @ValidateIf((o) => !o.duration_type)
    @IsDateString()
    @ApiProperty({ type: 'string', example: 'YYYY-MM-DD' })
    end_date: string;
}

export class UserListPaginatedDto implements IPagination {
    @ApiProperty({ required: false, default: 1 })
    @IsOptional()
    @IsNumber()
    page: number;

    @ApiProperty({ required: false, default: 10 })
    @IsOptional()
    @IsNumber()
    limit: number;

    @IsOptional()
    @IsObject()
    @ApiProperty({
        required: false,
        default: { order: 'asc', field: 'createdAt' },
        properties: {
            order: { type: 'string', enum: ['asc', 'desc'] },
            field: { type: 'string', enum: ['createdAt'] }
        }
    })
    sort: { field: string, order: "asc" | "desc" };

    @IsOptional()
    @ApiProperty({ type: 'string', description: 'Search by wallet id' })
    search: string;

    role: string;
}