/* @flow */

import system from '../utils/system'

export default {
    get errors(): Object {
        return {
            defaultLang: 'en',
            headers: {
                region: 'region',
                errorType: 'errorType'
            },
            externalMessagesURI: 'assets/docs/errorMessages.json'
        }
    },

    get security(): Object {
        return {
            jwt: {
                secret: '!@#$%^&',
                expiresIn: 60 * 60 * 24 // 24 hours
            },
            crypto: {
                algorithm: 'aes-256-ctr',
                password: 'rGp7kSea'
            }
        }
    },

    get ports(): Object {
        return {
            httpServer: 3000
        }
    },

    get database(): Object {
        const cliArgs = system.cliArgs

        const data = {
            protocol: 'mongodb',
            host: cliArgs.dbHost || 'localhost',
            port: cliArgs.dbPort || 27017,
            name: cliArgs.dbName || 'advertisement-prototype',

            get uri(): string {
                return `${data.protocol}://${data.host}:${data.port}/${data.name}`
            }
        }

        return data
    },

    get resource(): Object {
        return {
            advert: {
                photoPrefix: 'images/adverts'
            }
        }
    }
}
