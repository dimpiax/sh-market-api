/* @flow */

import mongoose from 'mongoose'

import Logger, { Level } from '../utils/logger'

// schemas
import Advert from './schemas/advert'
import User from './schemas/user'

import ModelName from './model-name'

const initModels = () => {
    mongoose.model(ModelName.advert, Advert)
    mongoose.model(ModelName.user, User)
}

export default {
    setup: async (uri: string): Promise<void> => {
        Logger.log(Level.database, `setup to ${uri}`)

        // config mongoose
        mongoose.set('debug', true)

        mongoose.connection.on('connected', () => {
            Logger.log(Level.database, `mongoose connected to port ${mongoose.connection.port}`)

            initModels()
        })

        mongoose.Promise = global.Promise
        await mongoose.connect(uri)
    }
}
