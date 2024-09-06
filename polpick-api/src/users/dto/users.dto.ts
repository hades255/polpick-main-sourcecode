import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams } from "class-transformer";
import { IsOptional, IsEmail, IsNotEmpty, IsString, IsArray, IsNumberString } from "class-validator";
import { Types } from "mongoose";

export class SigninDTO {
    @Transform(({ value }: TransformFnParams) => value?.trim() && value?.toLowerCase())
    @IsEmail({}, { message: "Please enter a valid email address." })
    @IsNotEmpty()
    @ApiProperty({ description: 'Email', required: false })
    email: string;

    @IsOptional()
    @IsNotEmpty()
    @ApiProperty({ description: 'Password', required: false })
    password: string;

    [key: string]: any
}


export class changePasswordDTO {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'User Id', required: true })
    user_id: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'oldPassword', required: true })
    old_password: string


    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'password', required: true })
    password: string

}



export class AdminUserDetails {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'User Id', required: true })
    user_id: string

}

export class ForgetPwdDTO {
    @IsString()
    @IsEmail({}, { message: "Please enter a valid $property." })
    @Transform(({ value }: TransformFnParams) => value?.trim() && value?.toLowerCase())
    @IsNotEmpty()
    @ApiProperty({ type: String })
    email: string;
}

export class AdminAccountDTO {
    @Transform(({ value }: TransformFnParams) => value?.trim() && value?.toLowerCase())
    @IsEmail({}, { message: "Please enter a valid email address." })
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    full_name: string;

    @IsString()
    @IsNotEmpty()
    id: string | Types.ObjectId;
}

export class AdminChangePasswordDTO {
    @IsString()
    @IsNotEmpty()
    old_password: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    'confirm-new-password': string;

    @IsString()
    @IsNotEmpty()
    id: string | Types.ObjectId;
}

export class ChangePwdDTO {
    @IsString()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    new_password: string;

    @IsString()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    confirm_password: string;

    @IsString()
    @IsNotEmpty()
    id: string | Types.ObjectId;
}

export class UserCreateFromAdminDTO {
    @Transform(({ value }: TransformFnParams) => value?.trim() && value?.toLowerCase())
    @IsEmail({}, { message: "Please enter a valid email address." })
    @IsNotEmpty()
    email: string;

    @IsString()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    full_name: string;

    @IsOptional()
    phone: string

    @IsOptional()
    country_code: string

    @IsNotEmpty({ message: 'Please enter a valid password' })
    @IsString()
    password: string

    @IsOptional()
    country: string

    @IsOptional()
    address: string

    @IsOptional()
    social_link: string

    id: string | Types.ObjectId;
}

export class UserUpdateFromAdminDTO {
    @Transform(({ value }: TransformFnParams) => value?.trim() && value?.toLowerCase())
    @IsEmail({}, { message: "Please enter a valid email address." })
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    full_name: string;

    @IsOptional()
    phone: string

    @IsOptional()
    country_code: string

    // @IsOptional()
    // country: string

    // @IsOptional()
    // state: string

    @IsOptional()
    address: string

    @IsOptional()
    social_link: string

    @IsString()
    @IsOptional()
    id: string | Types.ObjectId;
}

export class IdArrayDTO {
    @IsArray()
    @IsOptional()
    ids: Types.ObjectId[] | string[]
}

export class BotCreateQueryDto {
    @IsNotEmpty()
    @ApiProperty({ type: 'string', description: 'Limit for bot generation and listing. If provided, only up to this number of bots will be generated or listed.' })
    limit: number

    @IsOptional()
    @ApiProperty({ required: false, type: 'string', description: 'Set to true to always generate new users.' })
    new: string;

    id: string | Types.ObjectId;
}

