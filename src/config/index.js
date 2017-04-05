/* @flow */

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
        const data = {
            protocol: 'mongodb',
            host: 'localhost',
            port: 28029,
            name: 'advertisement-prototype',

            get uri(): string {
                return `${data.protocol}://${data.host}:${data.port}/${data.name}`
            }
        }

        return data
    }
}
