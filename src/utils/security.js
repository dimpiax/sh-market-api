/* @flow */

import crypto from 'crypto'

export type CryptType = 'aes-256-ctr'

class Crypt {
    _algorithm: CryptType
    _password: string

    constructor(value: CryptType, passwd: string) {
        this._algorithm = value
        this._password = passwd
    }

    encrypt(value: string): string {
        const c = crypto.createCipher(this._algorithm, new Buffer(this._password))
        return c.update(value, 'utf-8', 'hex') + c.final('hex')
    }

    decrypt(value: string): string {
        const c = crypto.createDecipher(this._algorithm, new Buffer(this._password))
        return c.update(value, 'hex', 'utf-8') + c.final('utf-8')
    }
}

export default {
    crypt: (key: CryptType, passwd: string): Crypt => new Crypt(key, passwd)
}
