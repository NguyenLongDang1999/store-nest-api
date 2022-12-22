// ** Strategy Imports
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy'
import { AccessTokenStrategy } from './strategies/accessToken.strategy'

// ** NestJS Imports
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PrismaModule } from './../prisma/prisma.module'

@Module({
    imports: [
        PrismaModule,
        PassportModule,
        JwtModule.register({})
    ],
    controllers: [AuthController],
    providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy]
})

export class AuthModule {}
