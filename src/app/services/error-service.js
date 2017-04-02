/* @flow */

import config from '../../config'

import LazyService from './lazy-service'
import APIError from '../errors'
import Utils from '../../utils'

export default class ErrorService {
    /**
     * default body for error messages
     * @return Object
     */
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
        const lang = (req.query.lang || config.errors.defaultLang).toLowerCase()

        const defaultMessageBody = ErrorService.getDefaultMessagesBody()
        let langMessages = defaultMessageBody
        const errorMessages = LazyService.getData('errorMessages')
        if (errorMessages != null && errorMessages[lang] != null) {
            langMessages = errorMessages[lang]
        }

        // retrieve error text
        const headers = config.errors.headers
        let text = Utils.getValue(langMessages, headers.region, err.region, headers.errorType, err.type)
        if (text == null) {
            text = Utils.getValue(defaultMessageBody, headers.region, err.region, headers.errorType, err.type)
        }
        if (text == null) {
            text = err.type
        }
        else {
            // inject dynamic variables to meta-tags
            const data = err.data
            if (data != null) {
                text = text.replace(/\$\{(.[^{}]+)\}/g, (substring: string, ...args: Array<any>): string => {
                    const prop = args[0]
                    return Utils.getValue(data, prop) || ''
                })
            }
        }

        return { status: err.code, text }
    }
}
