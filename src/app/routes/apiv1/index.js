/* @flow */

import { Router } from 'express'

import errorHandler from '../../middlewares/error-handler'

const router = Router()

router.use('/register', require('./register').default)
router.use('/auth', require('./auth').default)
router.use('/adverts', require('./adverts').default)

router.route('/ping')
    .get((req: Object, res: Object) => {
        res.send('pong')
    })

// error handling
router.use(errorHandler())

export default router
