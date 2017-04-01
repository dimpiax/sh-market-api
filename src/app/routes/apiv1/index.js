/* @flow */

import { Router } from 'express'

import APIError from '../../errors'

const router = Router()

router.use('/register', require('./register').default)
router.use('/auth', require('./auth').default)
router.use('/adverts', require('./adverts').default)

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
