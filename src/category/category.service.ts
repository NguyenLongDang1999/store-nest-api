import { Paginator } from '../utils/interface'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}
    
    async create(createCategoryDto: CreateCategoryDto) {
        return await this.prisma.category.create({ data: createCategoryDto })
    }

    async findAll(query?: Paginator) {
        const data = await this.prisma.category.findMany({
            take: Number(query.rows) || 10,
            skip: Number(query.first) || 0,
            orderBy: { created_at: 'desc' },
            where: {
                deleted_flg: false
            },
            select: {
                id: true,
                name: true,
                slug: true,
                status: true,
                popular: true,
                publish: true,
                image_uri: true,
                meta_title: true,
                meta_keyword: true,
                meta_description: true,
                parentCategory: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })

        const aggregations = await this.prisma.category.aggregate({ _count: true })
        
        return {
            data,
            aggregations
        }
    }

    async findOne(id: string) {
        return await this.prisma.category.findUnique({ where: { id } })    
    }

    async findExistsSlug(slug: string, id?: string) {
        const params = { slug }
        
        if (id) {
            params['id'] = { not: id }
        }
        
        return await this.prisma.category.count({  where: params })
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto) {
        return await this.prisma.category.update({
            where: { id },
            data: updateCategoryDto
        })
    }

    async remove(id: string) {
        return await this.prisma.category.delete({ where: { id } })
    }
}
