/* @flow */

import jwt from 'jsonwebtoken'

import config from '../../config'
import security from '../../utils/security'

import ModelName from '../../database/model-name'
import dbProxy from '../../database/db-proxy'
import APIError from '../errors'

import User from '../../database/schemas/user'

export default class UserService {
    static async register({ name, email, passwd, lang }: { name: string, email: string, passwd: string, lang: string }): Promise<void> {
        const isExist = await UserService.isExist(email)
        if (isExist) throw APIError.forbidden('register', { name, email, passwd, lang })

        try {
            // encrypt password
            const { algorithm, password } = config.security.crypto
            const encPasswd = security.crypt(algorithm, password).encrypt(passwd)
            await dbProxy.create(ModelName.user, { name, email, passwd: encPasswd, lang })
        } catch (err) {
            throw err
        }
    }

    static async auth({ email, passwd }: { email: string, passwd: string }): Promise<string> {
        // encrypt password, for comparison
        const { algorithm, password } = config.security.crypto
        const encPasswd = security.crypt(algorithm, password).encrypt(passwd)

        const user = await UserService.getUser(email)
        if (user == null || user.passwd !== encPasswd) throw APIError.forbidden('auth', { email, passwd })

        const { secret, expiresIn } = config.security.jwt
        const token = jwt.sign(user, secret, { expiresIn })
        return token
    }

    static isExist(value: string): Promise<boolean> {
        return dbProxy.isExist(ModelName.user, { email: value })
    }

    static getUser(value: string): Promise<User> {
        return dbProxy.findOne(ModelName.user, { email: value })
    }
}
