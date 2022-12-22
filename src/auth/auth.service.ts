// ** NestJS Imports
import { JwtService } from '@nestjs/jwt'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

// ** DTO Imports
import { CreateAuthDto } from './dto/create-auth.dto'

// ** Argon2 Imports
import * as argon2 from 'argon2'

// ** Service Imports
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        private prisma: PrismaService
    ) {}

    async signUp(createAuthDto: CreateAuthDto): Promise<any> {
        // // Check if user exists
        // const userExists = this.prisma.admins.findFirst({
        //     where: {
        //         email: createAuthDto.email
        //     }
        // })

        // if (userExists) {
        //     throw new BadRequestException('User already exists')
        // }
    
        // // Hash password
        // const hash = await this.hashData(createAuthDto.password)
        // const newUser = await this.prisma.admins.create({
        //     data: {
        //         email: createAuthDto.email,
        //         password: hash
        //     }
        // })
        
        // const tokens = await this.getTokens(newUser._id, newUser.username)
        // await this.updateRefreshToken(newUser._id, tokens.refreshToken)
        // return tokens
    }
    
    async signIn(data: CreateAuthDto) {
        const user = await this.prisma.admins.findFirst({
            where: {
                email: data.email,
                deleted_flg: false
            },
            select: {
                id: true,
                email: true,
                password: true
            }
        })

        if (!user) throw new BadRequestException('User does not exist')

        const passwordMatches = await argon2.verify(user.password, data.password)

        if (!passwordMatches) throw new BadRequestException('Password is incorrect')

        const tokens = await this.getTokens(user.id, user.email)
        await this.updateRefreshToken(user.id, tokens.refreshToken)

        return tokens
    }
    
    async logout(userId: string) {
        return this.prisma.admins.update({
            where: { id: userId },
            data: { refresh_token: null }
        })
    }
    
    hashData(data: string) {
        return argon2.hash(data)
    }
    
    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken)

        await this.prisma.admins.update({
            where: { id: userId },
            data: { refresh_token: hashedRefreshToken }
        })
    }
    
    async getTokens(userId: string, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email
            }, {
                secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                expiresIn: '15m'
            }),
            this.jwtService.signAsync({
                sub: userId,
                email
            }, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: '7d'
            })
        ])
    
        return {
            accessToken,
            refreshToken
        }
    }
}
