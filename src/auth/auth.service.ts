import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
    
    async findOneLogin(email: string) {
        return await this.prisma.admins.findFirst({ 
            where: { email, deleted_flg: false },
            select: {
                id: true,
                password: true
            }
        })
    }
}
