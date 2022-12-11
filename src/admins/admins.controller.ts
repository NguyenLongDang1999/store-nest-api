import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { AdminsService } from './admins.service'
import { CreateAdminDto } from './dto/create-admin.dto'
import { UpdateAdminDto } from './dto/update-admin.dto'
import { AdminSearch } from './../utils/interface'

@Controller('admins')
export class AdminsController {
    constructor(private readonly adminsService: AdminsService) {}

    @Post()
    async create(
        @Body() createAdminDto: CreateAdminDto,
        @Res() res: Response
    ) {
        const checkExists = await this.adminsService.checkExists(createAdminDto.email)

        if (checkExists) {
            return res.status(HttpStatus.CONFLICT).json({ message: 'Admins is Exists. Please try again!' })
        }

        const admins = await this.adminsService.create(createAdminDto)

        if (admins) {
            return res.status(HttpStatus.CREATED).json({ message: 'Admins Created Successfully!' })
        }

        return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Bad Request. Please try again!' })
    }

    @Get()
    async findAll(
        @Res() res: Response,
        @Query() params?: AdminSearch,
    ) {
        const { page, pageSize, search } = params
        const payload = {
            page: page * pageSize,
            pageSize,
            search
        }

        const { data, aggregations } = await this.adminsService.findAll(payload)

        return res.status(HttpStatus.OK).json({
            data,
            aggregations
        })
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.adminsService.findOne(+id)
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    //     return this.adminsService.update(+id, updateAdminDto)
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.adminsService.remove(+id)
    // }
}
