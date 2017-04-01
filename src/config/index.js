/* @flow */

export default {
    get ports(): Object {
        const data = {
            httpServer: 3000
        }

        return { ...data }
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
