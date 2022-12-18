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

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @ApiProperty()
        name: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
        slug: string

    @IsOptional()
    @ApiProperty({ required: false })
        parent_id?: string
    
    @IsOptional()
    @MaxLength(160)
    @ApiProperty({ required: false })
        description?: string

    @IsOptional()
    @ApiProperty({ required: false })
        image_uri?: string

    @IsNumber()    
    @IsOptional()
    @ApiProperty({ required: false, default: 1 })
        status?: number = 1

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false, default: 2 })
        popular?: number = 2

    @IsBoolean()
    @ApiProperty({ required: false, default: false })
        publish?: boolean = false

    @IsOptional()
    @MaxLength(60)
    @ApiProperty({ required: false })
        metaTitle?: string

    @IsOptional()
    @MaxLength(60)
    @ApiProperty({ required: false })
        metaKeyword?: string

    @IsOptional()
    @MaxLength(160)
    @ApiProperty({ required: false })
        metaDescription?: string

    @ApiProperty({ required: false })
        delete_flg?: boolean
}
