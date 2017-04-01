/* @flow */

export default {
    get docs(): { errorMessages: string } {
        return {
            errorMessages: 'assets/docs/errorMessages.json'
        }
    },

    get security(): Object {
        return {
            jwt: {
                secret: '!@#$%^&',
                expiresIn: 60 * 60 * 24 // 24 hours
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
            address: 'localhost',
            name: 'advertisement-prototype',

            get uri(): string {
                return `${data.protocol}://${data.address}/${data.name}`
            }
        }

        return { ...data }
    }
}
