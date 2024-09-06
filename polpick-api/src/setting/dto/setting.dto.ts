import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

export class BotControlDTO {
    @ApiProperty({
        description: 'Number of bots to decrease after one user joins',
        example: 1,
    })
    @IsNumber()
    botToDecreaseAfterOneUser: number;

    @ApiProperty({
        description: 'Maximum number of bots allowed per game',
        example: 10,
    })
    @IsNumber()
    maxBotPerGame: number;

    @ApiProperty({
        description: 'Average bet amount per bot',
        example: 50,
    })
    @IsNumber()
    avgBetAmountPerBot: number;

    @ApiProperty({
        description: 'Minimum number of bots allowed per game',
        example: 2,
    })
    @IsNumber()
    minAmountOfBotPerGame: number;


    @ApiProperty({
        description: 'Bots type',
        example: 1,
    })
    @IsNumber()
    botsType: number;


    // @ApiProperty({
    //     description: 'Number of bots to decrease after one user joins',
    //     example: 1,
    // })
    // @IsNumber()
    // botToDecreaseAfterOneUser30: number;

    // @ApiProperty({
    //     description: 'Maximum number of bots allowed per game',
    //     example: 10,
    // })
    // @IsNumber()
    // maxBotPerGame30: number;

    // @ApiProperty({
    //     description: 'Average bet amount per bot',
    //     example: 50,
    // })
    // @IsNumber()
    // avgBetAmountPerBot30: number;

    // @ApiProperty({
    //     description: 'Minimum number of bots allowed per game',
    //     example: 2,
    // })
    // @IsNumber()
    // minAmountOfBotPerGame30: number;

}



class BotControlDTO30 {
    @ApiProperty({
        description: 'Number of bots to decrease after one user joins',
        example: 1,
    })
    @IsNumber()
    botToDecreaseAfterOneUser30: number;

    @ApiProperty({
        description: 'Maximum number of bots allowed per game',
        example: 10,
    })
    @IsNumber()
    maxBotPerGame30: number;

    @ApiProperty({
        description: 'Average bet amount per bot',
        example: 50,
    })
    @IsNumber()
    avgBetAmountPerBot30: number;

    @ApiProperty({
        description: 'Minimum number of bots allowed per game',
        example: 2,
    })
    @IsNumber()
    minAmountOfBotPerGame30: number;
}

export class UpdateSettingDTO {
    // @ApiProperty({
    //     description: 'The unique identifier of the setting',
    //     example: '60c72b2f9e7b3f1f4c8b4567',
    // })
    // @IsString()
    // id: string;

    @ApiProperty({
        description: 'Bot control configuration',
        type: BotControlDTO,
    })
    @ValidateNested()
    @Type(() => BotControlDTO)
    botControlFifteen: BotControlDTO;


    @ApiProperty({
        description: 'Bot control configuration',
        type: BotControlDTO30,
    })
    @ValidateNested()
    @Type(() => BotControlDTO30)
    botControlThirty: BotControlDTO30;
}



export class GetSettingDto {
    @ApiProperty({
        description: 'Bots',
        example: 1,
    })
    @IsNumber()
    botsType: number;
}