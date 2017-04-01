/* @flow */

import jwt from 'jsonwebtoken'
import { Router } from 'express'

import config from '../../../config'

import AdvertService from '../../services/advert-service'
import APIError from '../../errors'

const router = Router()

router.use((req: Object, res: Object, next: () => void) => {
    const { token } = req.query
    if (token == null) {
        next(APIError.badRequest('adverts', { token }))
        return
    }

    const { secret } = config.security.jwt
    jwt.verify(token, secret, (err: any, decoded: any) => {
        if (err) {
            next(APIError.forbidden('adverts'))
            return
        }

        next()
    })
})

router.route('/')
    .get(async (req: Object, res: Object, next: () => void): Promise<void> => {
        try {
            const result = await AdvertService.getAdverts({ ...req.query })
            res.send(result)
        } catch (err) {
            next(err)
        }
    })

export default router
