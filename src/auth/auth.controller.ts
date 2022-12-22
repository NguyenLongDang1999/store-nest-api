import { Controller, Get, Post, Body, Req } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { Request } from 'express'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    signUp(@Body() createAuthDto: CreateAuthDto) {
        // return this.authService.signUp(createAuthDto)
    }

    @Post('signin')
    signIn(@Body() data: CreateAuthDto) {
        return this.authService.signIn(data)
    }

    @Get('logout')
    logout(@Req() req: Request) {
        this.authService.logout(req.user['sub'])
    }
}
