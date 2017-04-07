/* @flow */

import jwt from 'jsonwebtoken'
import { Router } from 'express'

import config from '../../../config'

import AdvertService from '../../services/advert-service'
import APIError from '../../errors'

// schemas
import Advert from '../../../database/schemas/advert'

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
            next(APIError.forbidden('adverts', { token }))
            return
        }

        req.user = decoded

        next()
    })
})

router.route('/')
    .get(async (req: Object, res: Object, next: () => void): Promise<void> => {
        try {
            const result = await AdvertService.getAdverts({ ...req.query })

            // append full path to photo storage
            const host = `${req.protocol}://${req.headers.host}`
            const photoPrefix = config.resource.advert.photoPrefix
            const resourcePhotoPrefix = `${host}/${photoPrefix}`

            // map retrieved results
            const filledDataResult = result.map((el: Advert): Advert => {
                el.photo = `${resourcePhotoPrefix}/${el.photo}`
                return el
            })

            res.send(filledDataResult)
        } catch (err) {
            next(err)
        }
    })

router.route('/tags')
    .get(async (req: Object, res: Object, next: () => void): Promise<void> => {
        try {
            const result = await AdvertService.getDistinctValues('tags')
            res.send(result)
        } catch (err) {
            next(err)
        }
    })

export default router
