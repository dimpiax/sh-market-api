/* @flow */

import APIError from '../errors'
import ErrorService from '../services/error-service'

export default (): mixed =>
    (err: Error | APIError, req: Object, res: Object, next: () => void) => {
        if (err instanceof APIError) {
            const { status, text } = ErrorService.getMessage(err, req)
            res.status(status).send(text)
            return
        }

        throw err
    }
