import { Injectable } from '@nestjs/common'
import { AdminSearch } from 'src/utils/interface'
import { PrismaService } from '../prisma/prisma.service'
import { CreateAdminDto } from './dto/create-admin.dto'
import { UpdateAdminDto } from './dto/update-admin.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AdminsService {
    constructor(private prisma: PrismaService) {}

    async create(createAdminDto: CreateAdminDto) {
        const hashedPassword = await bcrypt.hash(createAdminDto.password, 10)

        return await this.prisma.admins.create({
            data:  {
                ...createAdminDto,
                password: hashedPassword
            }
        })
    }

    async checkExists(email: string) {
        return await this.prisma.admins.count({ where: { email } })
    }

    async findAll(query?: AdminSearch) {
        const where = {
            deleted_flg: false,
            name: { contains: query.search?.name },
            phone: { contains: query.search?.phone },
            email: { contains: query.search?.email }
        }
        
        const data = await this.prisma.admins.findMany({
            take: Number(query.pageSize),
            skip: Number(query.page),
            orderBy: { created_at: 'desc' },
            where: where,
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                created_at: true
            }
        })

        const aggregations = await this.prisma.admins.aggregate({
            where: where,
            _count: true
        })
        
        return {
            data,
            aggregations
        }
    }
}
