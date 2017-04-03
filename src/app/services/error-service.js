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
                },
                adverts: {
                    errorType: {
                        badRequest: 'default adverts:BAD_REQUEST message',
                        forbidden: 'default adverts:FORBIDDEN message'
                    }
                }
            }
        }
    }

    static getMessage(err: APIError, req: Object): { status: number, text: string } {
        let lang = Utils.getValue(req, 'user', 'lang')
        if (lang == null) {
            lang = (req.query.lang || config.errors.defaultLang).toLowerCase()
        }

        const errorMessages = LazyService.getData('errorMessages')

        // retrieve error text
        const headers = config.errors.headers

        let text: ?string

        if (errorMessages != null) {
            [lang, 'en'].some((el: string): boolean => {
                text = Utils.getValue(errorMessages[el], headers.region, err.region, headers.errorType, err.type)
                return text != null
            })
        }

        // if no body messages found
        // get default
        if (text == null) {
            text = Utils.getValue(ErrorService.getDefaultMessagesBody(), headers.region, err.region, headers.errorType, err.type)
        }

        // in case that error is not declared
        if (text == null) {
            text = `${err.region}:${err.type}`
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
