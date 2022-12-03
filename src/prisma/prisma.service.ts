import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import slugify from 'slugify'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        this.$use(async (params, next) => {
            const Services = ['Category']

            if((params.action === 'create' || params.action === 'update') && Services.includes(params.model as string)) {
                const { args:{ data } } = params
        
                data.slug = slugify(`${data.name}`, {
                    lower: true,
                    strict: true,
                    remove: /[*+~.()'"!:@]/g 
                })
            }

            if ((params.action === 'delete' && Services.includes(params.model as string))) {
                params.action = 'update'
                params.args['data'] = { deleted_flg: true }
            }
        
            const result = await next(params)
            return result
        })
          
        await this.$connect()
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close()
        })
    }
}