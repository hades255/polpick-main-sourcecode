import { Optional } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { Transform, TransformFnParams } from "class-transformer"
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UserApiSignupDTO {
    @ApiProperty({ description: 'Full name of user', required: true })
    @IsString({ message: 'Value must be a string' })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: 'Full name is required!' })
    full_name: string

    @ApiProperty({ description: 'Email address', required: true })
    @IsString({ message: 'Value must be a string' })
    @Transform(({ value }: TransformFnParams) => value?.trim() && value?.toLowerCase())
    @IsNotEmpty({ message: 'Email address is required!' })
    @IsEmail({}, { message: 'Please enter a valid email!' })
    email: string

    @ApiProperty({ description: 'Phone number', required: false })
    @IsOptional()
    phone: string
    @ApiProperty({ description: 'Country code for phone number', required: false })
    @IsOptional()
    country_code: string

    @ApiProperty({ description: 'Address of user', required: true })
    @IsString({ message: 'Value must be a string' })
    @IsNotEmpty({ message: 'Address is required!' })
    address: string

    @ApiProperty({ description: 'Social media link of user', required: true })
    @IsString({ message: 'Value must be a string' })
    @IsNotEmpty({ message: 'Social media link is required!' })
    social_link: string

    @ApiProperty({ description: 'Password', required: true })
    @IsString({ message: 'Value must be a string' })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: 'Password is required!' })
    password: string
    @ApiProperty({ description: 'Confirm password', required: true })
    @IsString({ message: 'Value must be a string' })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: 'Confirm password is required!' })
    confirm_password: string

    @ApiProperty({ description: 'Terms & Conditions', required: true })
    @IsNotEmpty({ message: 'Please accept our Terms & Conditions' })
    agreedToTerms: boolean
    @ApiProperty({ description: 'Privacy & Policy', required: true })
    @IsNotEmpty({ message: 'Please accept our Privacy & Policy' })
    agreedToPrivaryPolicy: boolean

    @ApiProperty({ description: 'Device Token', required: false })
    @IsOptional()
    deviceToken: string

    @ApiProperty({ description: 'Profile image', type: 'file', required: false, title: 'profile_image' })
    profile_image: string
}

export class UserApiSigninDTO {
    @ApiProperty({ description: 'Email address', required: true })
    @IsString({ message: 'Value must be a string' })
    @Transform(({ value }: TransformFnParams) => value?.trim() && value?.toLowerCase())
    @IsNotEmpty({ message: 'Email address is required!' })
    @IsEmail({}, { message: 'Please enter a valid email!' })
    email: string

    @ApiProperty({ description: 'Password', required: true })
    @IsString({ message: 'Value must be a string' })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: 'Password is required!' })
    password: string

    @ApiProperty({ description: 'Device Token', required: false })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsOptional()
    deviceToken: string
}

export class EmailVerificationDTO {
    @ApiProperty({ description: 'Email address', required: false })
    @Transform(({ value }: TransformFnParams) => value?.trim() && value?.toLowerCase())
    @IsEmail({}, { message: 'Please enter a valid email!' })
    @IsNotEmpty({ message: 'Email address is required!' })
    email: string

    @ApiProperty({ description: 'OTP', required: true })
    @IsString({ message: 'OTP must be a string value!' })
    @IsNotEmpty({ message: 'OTP is required!' })
    otp: string
}

export class UserProfileUpdateDTO {
    @ApiProperty({ description: 'Full name of user', required: false })
    @IsOptional()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: 'Full name is required' })
    full_name: string

    @ApiProperty({ description: 'Email address', required: false })
    @IsOptional()
    @Transform(({ value }: TransformFnParams) => value?.trim() && value?.toLowerCase())
    @IsEmail({}, { message: 'Please enter a valid email!' })
    @IsNotEmpty({ message: 'Email address is required!' })
    email: string

    @ApiProperty({ description: 'Phone number', required: false })
    @IsOptional()
    phone: string
    @ApiProperty({ description: 'Country code for phone number', required: false })
    @IsOptional()
    country_code: string

    @ApiProperty({ description: 'Address of user', required: false })
    @IsOptional()
    @IsNotEmpty({ message: 'Address is required!' })
    address: string

    @ApiProperty({ description: 'Social media link of user', required: false })
    @IsOptional()
    @IsString({ message: 'Value must be a string' })
    @IsNotEmpty({ message: 'Social media link is required!' })
    social_link: string

    @ApiProperty({ description: 'Profile image', type: 'file', required: false, title: 'profile_image' })
    profile_image: string
}

export class EmailUpdateVerificationDTO {
    @ApiProperty({ description: 'OTP', required: true })
    @IsString({ message: 'OTP must be a string value!' })
    @IsNotEmpty({ message: 'OTP is required!' })
    otp: string

    @ApiProperty({ description: 'Email address', required: true })
    @Transform(({ value }: TransformFnParams) => value?.trim() && value?.toLowerCase())
    @IsEmail({}, { message: 'Please enter a valid email!' })
    @IsNotEmpty({ message: 'Email address is required!' })
    email: string
}

export class ForgotPasswordDTO {
    @ApiProperty({ description: 'Email address', required: true })
    @Transform(({ value }: TransformFnParams) => value?.trim() && value?.toLowerCase())
    @IsEmail({}, { message: 'Please enter a valid email!' })
    @IsNotEmpty({ message: 'Email address is required!' })
    email: string
}

export class ForgotPasswordVerifyDTO {
    @ApiProperty({ description: 'Email address', required: true })
    @Transform(({ value }: TransformFnParams) => value?.trim() && value?.toLowerCase())
    @IsEmail({}, { message: 'Please enter a valid email!' })
    @IsNotEmpty({ message: 'Email address is required!' })
    email: string

    @ApiProperty({ description: 'OTP', required: true })
    @IsString({ message: 'OTP must be a string value!' })
    @IsNotEmpty({ message: 'OTP is required!' })
    otp: string
}

export class ResetPassword {
    @ApiProperty({ description: 'Unique Token', required: true })
    @IsString({ message: 'Value must be a string' })
    @IsNotEmpty({ message: 'Token is required!' })
    token: string

    @ApiProperty({ description: 'Password', required: true })
    @IsString({ message: 'Value must be a string' })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: 'Password is required!' })
    password: string

    @ApiProperty({ description: 'Confirm password', required: true })
    @IsString({ message: 'Value must be a string' })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: 'Confirm password is required!' })
    confirm_password: string
}

export class UpdatePasswordDTO {
    @ApiProperty({ description: 'Password', required: true })
    @IsString({ message: 'Value must be a string' })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: 'Password is required!' })
    password: string

    @ApiProperty({ description: 'Confirm password', required: true })
    @IsString({ message: 'Value must be a string' })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: 'Confirm password is required!' })
    confirm_password: string
}

export class CreateUserWallet {
    @IsNotEmpty()
    @ApiProperty({ type: 'string', description: 'Create Random user name for the user with wallet' })
    walletId: string;

    @IsOptional()
    @ApiProperty({ type: 'string', required: false, description: 'Affiliate link iso code' })
    affiliate_link: string;
}

export class GetWalletUser {
    @IsNotEmpty()
    @ApiProperty({ type: 'string', description: 'Create Random user name for the user with wallet' })
    walletId: string;
}

export class UpdateUserDto {
    @IsOptional()
    @ApiProperty({ type: 'string', required: false, description: 'User country iso code' })
    country: string;

    @IsNotEmpty()
    @ApiProperty({ type: 'string', description: 'Wallet id' })
    walletId: string;

    @ApiProperty({ type: 'file', required: false })
    profile_image: string;
}

export class CreateAffiliateLink {
    @IsNotEmpty()
    @ApiProperty({ type: 'string', description: 'Get full name of a user' })
    full_name: string;

    @IsNotEmpty()
    @ApiProperty({ type: 'string', description: 'Get email of a user' })
    email: string;

    @IsNotEmpty()
    @ApiProperty({ type: 'string', description: 'Get contact number of a user' })
    phone: string;

    @IsNotEmpty()
    @ApiProperty({ type: 'string', description: 'Get User name of a user' })
    username: string;

    @IsNotEmpty()
    @ApiProperty({ type: 'string', description: 'Get User name of a user' })
    walletAddress: string;
}

export class UserDetails {
    @ApiProperty({ description: 'Full name of user', required: true })
    @IsString({ message: 'Value must be a string' })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: 'Full name is required!' })
    username: string


    @ApiProperty({ description: 'Country code for phone number', required: false })
    @IsOptional()
    country_code: string;

    @ApiProperty({ description: 'Wallet Id', required: false })
    @IsOptional()
    walletId: string;

    @ApiProperty({ description: 'Profile image', type: 'file', required: false, title: 'profile_image' })
    profile_image: string;

    @ApiProperty({ description: 'Total win', required: false, })
    total_wins: number;

    @ApiProperty({ description: 'Highest win', required: false, })
    highest_win: number;

    @ApiProperty({ description: 'Highest win Amount', required: false, })
    total_game: number;

    @ApiProperty({ description: 'Highest win Amount', required: false, })
    total_win: number;
}

export class userProfile {
    @ApiProperty({ description: 'Highest win', required: false, })
    wallet: number;
}



export class OTPSendDto {
    @IsString()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Wallet ID is required' })
    walletId: string;

    @ApiProperty({ description: 'User name of user', required: true })
    @IsString({ message: 'Value must be a string' })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: 'User name is required!' })
    userName: string
}


export class OTPVerifyDto {
    @IsString()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Wallet ID is required' })
    walletId: string;

    @IsString()
    @IsNotEmpty({ message: 'OTP is required' })
    otp: string;
}
