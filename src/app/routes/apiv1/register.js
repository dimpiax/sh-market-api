/* @flow */

import { Router } from 'express'

import UserService from '../../services/user-service'
import Utils from '../../../utils'

import APIError from '../../errors'

const router = Router()

router.route('/')
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

export default router
