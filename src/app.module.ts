// ** Controllers Imports
import { CategoryController } from './category/category.controller'

// ** Middleware Imports
import { AuthMiddleware } from './auth/auth.middleware'

// ** NestJS Imports
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'

// ** Module Imports
import { CategoryModule } from './category/category.module'
import { PrismaModule } from './prisma/prisma.module'
import { AdminsModule } from './admins/admins.module'
import { AuthModule } from './auth/auth.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        PrismaModule,

        CategoryModule,
        AdminsModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService]
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(CategoryController)
    }
}
