import { ApiProperty } from "@nestjs/swagger";
import {
  IsOptional,
  IsString,
  ValidateIf,
  IsEnum,
  IsNotEmpty,
} from "class-validator";
import {
  ProviderCodeEnum,
  UserAgentEnum,
} from "src/common/enums/changelly.enum";

export class ChangellyDto {
  @ApiProperty({ type: "object" })
  @IsOptional()
  params: any;
}

export class ChangellyPayDto {
  @ApiProperty({ type: "string" })
  @IsNotEmpty()
  @IsString()
  externalUserId: string;

  @ApiProperty({ type: "string" })
  @IsNotEmpty()
  @IsString()
  externalOrderId: string;

  @ApiProperty({ type: "string", enum: [Object.values(ProviderCodeEnum)] })
  @IsNotEmpty()
  @IsString()
  @IsEnum(ProviderCodeEnum)
  providerCode: string;

  @ApiProperty({ type: "string" })
  @IsNotEmpty()
  @IsString()
  currencyFrom: string;

  @ApiProperty({ type: "string" })
  @IsNotEmpty()
  @IsString()
  currencyTo: string;

  @ApiProperty({ type: "string" })
  @IsString()
  amountFrom: string;

  @ApiProperty({ type: "string" })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ type: "string" })
  @ValidateIf((o) => o.country === "US")
  @IsString({ message: "State is required if the country is US" })
  state: string;

  @ApiProperty({ type: "string" })
  @IsOptional()
  ip: string;

  @ApiProperty({ type: "string" })
  @IsNotEmpty()
  @IsString()
  walletAddress: string;

  @ApiProperty({ type: "string" })
  @IsNotEmpty()
  @IsString()
  walletExtraId: string;

  @ApiProperty({ type: "string", enum: [Object.values(UserAgentEnum)] })
  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @ApiProperty({ type: "string" })
  @IsOptional()
  userAgent: string;

  @ApiProperty({ type: "object" })
  @IsOptional()
  metadata: object;
}

export class ChangellyPayOfferDto {
  @ApiProperty({ type: "string" })
  @IsString()
  externalUserId: string;

  @ApiProperty({ type: "string" })
  @IsString()
  providerCode: string;

  @ApiProperty({ type: "string" })
  @IsString()
  currencyFrom: string;

  @ApiProperty({ type: "string" })
  @IsString()
  currencyTo: string;

  @ApiProperty({ type: "string" })
  @IsString()
  amountFrom: string;

  @ApiProperty({ type: "string" })
  @IsString()
  country: string;

  @ApiProperty({ type: "string" })
  @ValidateIf((o) => o.country === "US")
  @IsString({ message: "State is required if the country is US" })
  state: string;
}
