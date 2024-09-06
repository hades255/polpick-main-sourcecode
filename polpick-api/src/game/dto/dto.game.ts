import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsObject, IsOptional, ValidateNested } from "class-validator"

export class WinRatioListDto {
    @IsOptional()
    @ApiProperty({ type: 'string', description: 'Wallet id'})
    walletId: string;

    @IsOptional()
    @IsObject()
    @ApiProperty({ required: false, default: { order: 'desc', field: 'rank' }, properties: { order: { type: 'string', enum: ['asc', 'desc'] }, field: { type: 'string', enum: ['rank', 'winRatio', 'totalTradesCount'] } } })
    sort?: { field: string, order: "asc" | "desc" };
}

export class WinRationById {
    @IsNotEmpty()
    @ApiProperty({ type: 'string', description: 'Wallet id of a user'})
    walletId: string;
    
}

export class GameListPaginatedDto {
    @ApiProperty({ required: false, default: 1 })
    @IsOptional()
    @IsNumber()
    page?: number;

    @ApiProperty({ required: false, default: 10 })
    @IsOptional()
    @IsNumber()
    limit?: number;

    @ApiProperty({ type: 'string', default: "30", enum: ['30', '15'] })
    type: string;
}

export class GameResultDto {
    @ApiProperty({ required: false, type: 'string' })
    @IsOptional()
    gameId?: number;

    @ApiProperty({
        type: 'array', items: {
            type: 'object', properties: {
                walletId: { type: 'string' },
                betFor: { type: 'string' },
                tradeAmount: { type: 'string' },
                username: { type: 'string' },
                profile_image: { type: 'string' },
                totalReturn: { type: 'string' },
                gameId: { type: 'string' },
                orderId: { type: 'string' },
            }
        },
        required: false
    })
    @IsOptional()
    @Type(() => UserDataDto)
    @ValidateNested({ each: true })
    up_user_array?: UserDataDto[];

    @ApiProperty({
        type: 'array', items: {
            type: 'object', properties: {
                walletId: { type: 'string' },
                betFor: { type: 'string' },
                tradeAmount: { type: 'string' },
                username: { type: 'string' },
                profile_image: { type: 'string' },
                totalReturn: { type: 'string' },
                gameId: { type: 'string' },
                orderId: { type: 'string' },
            }
        },
        required: false
    })
    @IsOptional()
    @Type(() => UserDataDto)
    @ValidateNested({ each: true })
    down_user_array?: UserDataDto[];

    @ApiProperty({ type: 'string', required: false, enum: ['draw', 'up', 'down'] })
    @IsOptional()
    result: 'draw' | 'up' | 'down';
}

export class UserDataDto {
    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    walletId: string;

    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    betFor: string;

    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    tradeAmount: string;

    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    username: string;

    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    profile_image: string;

    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    totalReturn: number;

    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    gameId: string;

    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    orderId: string;
}