import * as bcrypt from 'bcrypt'
import { CONSTANTS } from 'src/utils/constants'
import { sign } from 'jsonwebtoken'

export const encodePassword = (password: string) => {
    return bcrypt.hash(password, CONSTANTS.SALT_ROUNDS)
}

export const comparePassword = (password: string, password_hash: string) => {
    return bcrypt.compare(password, password_hash)
}

export const randomString = (length = 50) => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result
}

export const getJWT = (user, exp_time = CONSTANTS.ACCESS_TOKEN_EXP_TIME) => {
    if (user && user.id && user.role && user.name) {
        const claim = {
            'id': user.id,
            'name': user.name,
            'role': user.role,
            'avatar': user.image_uri,
            'iat': Math.round(new Date().getTime() / 1000) - CONSTANTS.ONE_HOUR, //dat note: -1 hours, work around for bug JWTIssuedAtFuture
            'exp': Math.round(new Date().getTime() / 1000) + exp_time
        }

        return sign(claim, 'vietnamvodich')
    } else {
        return false
    }
}