/* @flow */

import { Router } from 'express'

import UserService from '../../services/user-service'
import Utils from '../../../utils'

import APIError from '../../errors'

const router = Router()

router.route('/')
    .post(async (req: Object, res: Object, next: () => void): Promise<void> => {
        const { email, passwd } = req.body

        if (!Utils.isExistValues(email, passwd)) {
            next(APIError.badRequest('auth', { email, passwd }))
            return
        }

        try {
            const result = await UserService.auth({ email, passwd })
            res.send(result)
        } catch (err) {
            next(err)
        }
    })

export default router
