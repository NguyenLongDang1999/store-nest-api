export enum CONSTANTS {
    SALT_ROUNDS = 10,
    ACCESS_TOKEN_EXP_TIME = 60 * 60,
    ONE_HOUR = 60 * 60,
    ONE_MONTH = 30 * 24 * 60 * 60 * 1000,
}

export const JWT_KEY = process.env.JWT_KEY