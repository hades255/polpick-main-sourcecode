import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber, IsObject, IsNotEmpty } from "class-validator";

export class OrderTransactionListDto {
    @ApiProperty({ required: false, default: 1 })
    @IsOptional()
    @IsNumber()
    page?: number;

    @ApiProperty({ required: false, default: 10 })
    @IsOptional()
    @IsNumber()
    limit?: number;

    @IsOptional()
    @IsObject()
    @ApiProperty({
        required: false,
        default: { order: 'asc', field: 'createdAt' },
        properties: {
            order: { type: 'string', enum: ['asc', 'desc'] },
            field: { type: 'string', enum: ['createdAt', 'tradeAmount', 'profitAmount', 'winningAmount'] }
        }
    })
    sort?: { field: string, order: "asc" | "desc" };

    @ApiProperty({ type: 'string', default: '' })
    @IsNotEmpty()
    walletId: string;
}