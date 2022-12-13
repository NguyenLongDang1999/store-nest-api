import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CategoryModule } from './category/category.module'
import { PrismaModule } from './prisma/prisma.module'
import { AdminsModule } from './admins/admins.module'
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [CategoryModule, PrismaModule, AdminsModule, AuthModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
