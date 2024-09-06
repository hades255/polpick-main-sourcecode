import { ApiProperty } from "@nestjs/swagger"
import { ChatHistory, IMakeTrade } from "../interface/websocket.interface";

export class MakeTradeDto implements IMakeTrade {
    gameId: string;
    gameType: string;
    @ApiProperty({ required: true, type: String })
    poolId: string;

    @ApiProperty({ required: true, type: String })
    avatarUrl: string;

    @ApiProperty({ required: true, type: String })
    countryCode: string;

    @ApiProperty({ type: Boolean })
    upOrDown: boolean;

    @ApiProperty({ required: true, type: String })
    whiteLabelId: string;

    @ApiProperty({ required: true, type: Number })
    tradeAmount: number;

    @ApiProperty({ required: true, type: String})
    walletId: string;
}

export class ChatHiostoryDto implements ChatHistory{
    @ApiProperty({ required: true, type: String })
    walletId: string;

    @ApiProperty({ required: true, type: String })
    username: string;

    @ApiProperty({ required: true, type: String })
    message: string;

    @ApiProperty({ required: true, type: Boolean })
    isNew: boolean;

    @ApiProperty({ required: true, type: Number })
    time: number;
} 