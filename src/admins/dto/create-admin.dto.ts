import { ApiProperty } from '@nestjs/swagger'
import {
    IsBoolean,
    IsNotEmpty,
    IsString,
    IsNumber,
    MaxLength,
    MinLength,
    IsOptional
} from 'class-validator'

export class CreateAdminDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @ApiProperty()
        name: string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    @ApiProperty()
        email: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @ApiProperty()
        password: string

    @IsOptional()
    @ApiProperty({ required: false })
        token?: string

    @IsNotEmpty()
    @IsNumber()    
    @ApiProperty()
        role: number

    @IsOptional()
    @MaxLength(160)
    @ApiProperty({ required: false })
        description?: string

    @IsOptional()
    @ApiProperty({ required: false })
        image_uri?: string

    @ApiProperty({ required: false })
        delete_flg?: boolean
}
