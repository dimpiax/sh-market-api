/* @flow */

import LazyService from './lazy-service'
import APIError from '../errors'
import Utils from '../../utils'

export default class ErrorService {
    static getDefaultMessagesBody(): Object {
        return {
            region: {
                register: {
                    errorType: {
                        badRequest: 'default register:BAD_REQUEST message',
                        forbidden: 'default register:FORBIDDEN message'
                    }
                },
                auth: {
                    errorType: {
                        badRequest: 'default auth:BAD_REQUEST message',
                        forbidden: 'default auth:FORBIDDEN message'
                    }
                }
            }
        }
    }

    static getMessage(err: APIError, req: Object): { status: number, text: string } {
        const lang = req.query.lang || 'en'

        let langMessages = ErrorService.getDefaultMessagesBody()
        const errorMessages = LazyService.getData('errorMessages')
        if (errorMessages != null && errorMessages[lang] != null) {
            langMessages = errorMessages[lang]
        }

        // retrieve error text
        let text = Utils.getValue(langMessages, 'region', err.region, 'errorType', err.type)
        if (text == null) {
            text = Utils.getValue(ErrorService.getDefaultMessagesBody(), 'region', err.region, 'errorType', err.type)
        }
        if (text == null) {
            text = err.type
        }

        // inject dynamic variables to meta-tags
        const data = err.data
        if (data != null) {
            text = text.replace(/\$\{(.[^{}]+)\}/g, (substring: string, ...args: Array<any>): string => {
                const prop = args[0]
                return Utils.getValue(data, prop) || ''
            })
        }

        return { status: err.code, text }
    }
}
