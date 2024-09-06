import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsObject, IsString, IsDateString } from "class-validator";

export class WeeklyJackpotListDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ type: 'string', default: '' })
    walletId: string;

    @IsOptional()
    @IsObject()
    @ApiProperty({ required: false, default: { order: 'desc', field: 'totalTurnOver' }, properties: { order: { type: 'string', enum: ['asc', 'desc'] }, field: { type: 'string', enum: ['totalTradeAmount', 'totalTurnOver'] } } })
    sort?: { field: string, order: "asc" | "desc" };
}

export class WeeklyJackpotHistoryListDto {
    @IsOptional()
    @IsDateString()
    @ApiProperty({ required: false, description: 'Week date to fetch for that week', default: 'YYYY-MM-DD' })
    week_date: string;

    @IsOptional()
    @ApiProperty({ type: 'boolean', default: false })
    top_only?: boolean;

    @IsOptional()
    @IsObject()
    @ApiProperty({ required: false, default: { order: 'desc', field: 'totalTurnOver' }, properties: { order: { type: 'string', enum: ['asc', 'desc'] }, field: { type: 'string', enum: ['totalTradeAmount', 'totalTurnOver'] } } })
    sort?: { field: string, order: "asc" | "desc" };
}