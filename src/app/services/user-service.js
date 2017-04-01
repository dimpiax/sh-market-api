/* @flow */

import ModelName from '../../database/model-name'
import dbProxy from '../../database/db-proxy'
import APIError from '../errors'

export default class UserService {
    static async register({ name, email, passwd, lang }: { name: string, email: string, passwd: string, lang: string }): Promise<void> {
        const isExist = await UserService.isExist(email)
        if (isExist) throw APIError.forbidden('register', { name, email, passwd, lang })

        try {
            await dbProxy.create(ModelName.user, { name, email, passwd, lang })
        } catch (err) {
            throw err
        }
    }

    static async auth({ email, passwd }: { email: string, passwd: string }): Promise<Object> {
        const isExist = await UserService.isExist(email)
        if (!isExist) throw APIError.forbidden('auth', { email, passwd })


        return dbProxy
    }

    static isExist(value: string): Promise<boolean> {
        return dbProxy.isExist(ModelName.user, { email: value })
    }
}
