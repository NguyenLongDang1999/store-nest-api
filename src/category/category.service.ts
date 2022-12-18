import { CategorySearch } from '../utils/interface'
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

    async findAll(query?: CategorySearch) {
        const where = {
            deleted_flg: false,
            name: { contains: query?.name || undefined },
            parent_id: { equals: query?.parent_id || undefined },
            status: { equals: Number(query?.status) || undefined },
            popular: { equals: Number(query?.popular) || undefined }
        }
        
        const data = await this.prisma.category.findMany({
            take: Number(query.pageSize),
            skip: Number(query.page),
            orderBy: { created_at: 'desc' },
            where: where,
            select: {
                id: true,
                name: true,
                status: true,
                popular: true,
                image_uri: true,
                created_at: true,
                updated_at: true,
                parentCategory: {
                    select: {
                        id: true,
                        name: true,
                        image_uri: true
                    }
                }
            }
        })

        const totalPage = await this.prisma.category.aggregate({
            where: where,
            _count: true
        })

        const aggregations = Math.ceil(totalPage._count / query.pageSize) || 1
        
        return {
            data,
            aggregations
        }
    }

    async findOne(id: string) {
        return await this.prisma.category.findUnique({ 
            where: { id },
            select: {
                id: true,
                name: true,
                slug: true,
                parent_id: true,
                description: true,
                status: true,
                popular: true,
                image_uri: true,
                meta_title: true,
                meta_keyword: true,
                meta_description: true
            }
        })
    }

    async fetchCategoryData() {
        return await this.prisma.category.findMany({
            orderBy: { created_at: 'desc' },
            where: {
                deleted_flg: false,
                parent_id: null
            },
            select: {
                id: true,
                name: true
            }
        })
    }

    async findExistsSlug(slug: string, id?: string) {
        const params = { slug }
        
        if (id) {
            params['id'] = { not: id }
        }
        
        return await this.prisma.category.count({ where: params })
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto) {
        return await this.prisma.category.update({
            where: { id },
            data: updateCategoryDto
        })
    }

    async remove(id: string) {
        return await this.prisma.category.update({
            where: { id },
            data: { deleted_flg: true }
        })
    }
}
