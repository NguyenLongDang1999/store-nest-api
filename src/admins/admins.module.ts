import { PrismaModule } from './../prisma/prisma.module'
import { Module } from '@nestjs/common'
import { AdminsService } from './admins.service'
import { AdminsController } from './admins.controller'

@Module({
    controllers: [AdminsController],
    providers: [AdminsService],
    imports: [PrismaModule]
})
export class AdminsModule {}
