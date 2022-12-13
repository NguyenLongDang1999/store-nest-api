import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Response } from 'express'
import { comparePassword, randomString, getJWT } from 'src/utils/funcs'
import { CONSTANTS } from 'src/utils/constants'

interface Login {
  email: string
  password: string
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(
        @Body() data: Login,
        @Res() res: Response
    ) {
        if (!data.email || !data.password) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Bad Request. Please try again!' })
        }

        const admins = await this.authService.findOneLogin(data.email)

        if (!admins) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Admins not found. Please try again!' })
        }

        const matchPassword = await comparePassword(data.password, admins.password)

        if (!matchPassword) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Password is incorrect. Please try again!' })
        }

        const refresh_token = randomString(50)
        
        const getAdmins = {
            ...admins,
            refresh_token: refresh_token,
            access_token: getJWT(admins),
            exp_time: CONSTANTS.ACCESS_TOKEN_EXP_TIME
        }

        res.cookie('ELRT', getAdmins.refresh_token, {
            httpOnly: process.env.ENV == 'production' ? true : false,
            sameSite: process.env.ENV == 'production' ? true : false,
            secure: process.env.ENV == 'production' ? true : false,
            maxAge: CONSTANTS.ONE_MONTH
        })

        return res.status(HttpStatus.OK).json({
            data: {
                'access_token': getAdmins.access_token,
                'id': getAdmins.id,
                'exp_time': getAdmins.exp_time
            },
            message: 'success'
        })
    }
}
