import { ApiProperty } from "@nestjs/swagger"
import { ChatHistory } from "../interface/chat.interface";



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