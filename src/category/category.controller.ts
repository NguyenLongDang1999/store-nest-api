import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    async create(
        @Body() createCategoryDto: CreateCategoryDto,
        @Res() res: Response
    ) {
        const category = await this.categoryService.create(createCategoryDto)

        if (category) {
            return res.status(HttpStatus.CREATED).json({ message: 'Category Created Successfully!' })
        }

        return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Bad Request. Please try again!' })
    }

    @Get()
    async findAll(
        @Res() res: Response,
        @Query('lazyEvent') lazyEvent?: string,
    ) {
        const parseQuery = lazyEvent ? JSON.parse(lazyEvent as string) : ''
        const { data, aggregations } = await this.categoryService.findAll(parseQuery)

        return res.status(HttpStatus.OK).json({
            data,
            aggregations
        })
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
        @Res() res: Response
    ) {
        const category = await this.categoryService.findOne(id)

        if (category) {
            return res.status(HttpStatus.OK).json({ message: 'Category FindOne Successfully!' })
        }

        return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Bad Request. Please try again!' })   
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
        @Res() res: Response
    ) {
        if (!id) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'ID is invalid. Please try again!' })    
        }

        const find = await this.categoryService.findOne(id)

        if (!find) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Category is invalid. Please try again!' })    
        }

        const category = await this.categoryService.update(id, updateCategoryDto)

        if (category) {
            return res.status(HttpStatus.OK).json({ message: 'Category Updated Successfully!' })
        }

        return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Bad Request. Please try again!' })
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.categoryService.remove(+id)
    }
}
