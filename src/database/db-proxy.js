/* @flow */

import mongoose from 'mongoose'

import type { ModelNameType } from './model-name'

const getModel = (name: ModelNameType): Object => mongoose.model(name)

export default {
    create: async (name: ModelNameType, doc: Object): Promise<void> => {
        try {
            const result = await getModel(name).create(doc)
            return result
        } catch (err) {
            throw err
        }
    },

    isExist: async (name: ModelNameType, query: Object): Promise<boolean> => {
        try {
            const count = await getModel(name).count(query)
            return count > 0
        } catch (err) {
            throw err
        }
    }
}
