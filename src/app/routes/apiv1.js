/* @flow */

import { Router } from 'express'

import UserService from '../services/user-service'
import Utils from '../../utils'

import APIError from '../errors'
import type { ErrorType } from '../errors'

const router = Router()

router.route('/register')
    .post(async (req: Object, res: Object, next: () => void): Promise<void> => {
        const { name, email, passwd, lang } = req.body

        if (!Utils.isExistValues(name, email, passwd, lang)) {
            next(APIError.badRequest('register', { name, email, passwd, lang }))
            return
        }

        try {
            await UserService.register({ name, email, passwd, lang })
            res.send(`Hello ${name}, you have been registered in our system!`)
        } catch (err) {
            next(err)
        }
    })

router.route('/auth')
    .get(async (req: Object, res: Object, next: () => void): Promise<void> => {
        const { email, passwd } = req.body

        if (!Utils.isExistValues(email, passwd)) {
            next(APIError.badRequest('auth', { email, passwd }))
            return
        }

        try {
            const result = await UserService.auth({ email, passwd })
            console.log(result)
        } catch (err) {
            next(err)
        }
    })

router.route('/ping')
    .get((req: Object, res: Object) => {
        res.send('pong')
    })

// error handling
router.use((err: Error | APIError, req: Object, res: Object, next: () => void) => {
    if (err instanceof APIError) {
        console.log('API Error', err)

        const type = err.type
        const data = err.data

        let message: string = 'default message'
        if (type === 'badRequest') {
            message = `malformed syntax for ${type}`
        }
        else {
            switch (err.region) {
                case 'register':
                    if (type === 'forbidden') {
                        if (data) {
                            message = `${data.name}, you are registered here under mail: ${data.email}`
                        }
                    }

                    break

                case 'auth':
                    break

                default: break
            }
        }

        res.status(err.code).send(message)
        return
    }

    throw err
})

export default router
