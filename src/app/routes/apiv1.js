/* @flow */

import { Router } from 'express'

const router = Router()

router.route('/ping')
    .get((req: Object, res: Object) => {
        res.send('pong')
    })

export default router
