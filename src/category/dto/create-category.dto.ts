import { ApiProperty } from '@nestjs/swagger'
import {
    IsBoolean,
    IsNotEmpty,
    IsString,
    IsNumber,
    MaxLength,
    MinLength,
    IsEmpty,
    IsOptional
} from 'class-validator'

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @ApiProperty()
        name: string

    @ApiProperty()
        slug: string

    @IsEmpty()
    @IsOptional()
    @ApiProperty({ required: false })
        parent_id?: string
    
    @IsEmpty()
    @IsOptional()
    @MaxLength(160)
    @ApiProperty({ required: false })
        description?: string

    @IsEmpty()
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

    @IsEmpty()
    @IsOptional()
    @MaxLength(160)
    @ApiProperty({ required: false })
        metaTitle?: string

    @IsEmpty()
    @IsOptional()
    @MaxLength(160)
    @ApiProperty({ required: false })
        metaKeyword?: string

    @IsEmpty()
    @IsOptional()
    @MaxLength(160)
    @ApiProperty({ required: false })
        metaDescription?: string

    @ApiProperty({ required: false })
        delete_flg?: boolean
}
