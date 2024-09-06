import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsObject, IsString } from "class-validator";

export class HighRollerListDto {
    @IsOptional()
    @ApiProperty({ type: 'string', default: '' })
    walletId: string;

    @IsOptional()
    @IsObject()
    @ApiProperty({ required: false, default: { order: 'desc', field: 'totalTurnOver' }, properties: { order: { type: 'string', enum: ['asc', 'desc'] }, field: { type: 'string', enum: ['totalTradeAmount', 'totalTurnOver'] } } })
    sort?: { field: string, order: "asc" | "desc" };
}