import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { decodeJWT } from 'src/utils/funcs'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1]
            const auth_user = decodeJWT(token)
    
            if (auth_user) {
                req.admin = auth_user
                next()
            } else {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    'message': 'Unauthorized.',
                    'extensions': {
                        'code': 'unauthorized'
                    }
                })
            }
        } else {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                'message': 'Unauthorized',
                'extensions': {
                    'code': 'unauthorized'
                }
            })
        }
    }
}
