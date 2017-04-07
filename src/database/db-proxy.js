/* @flow */

import mongoose from 'mongoose'

import type { ModelNameType } from './model-name'

const getModel = (name: ModelNameType): Object => mongoose.model(name)

export default {
    findOne: async (name: ModelNameType, query: Object, projection: string = '-_id -__v'): Promise<Object> => {
        try {
            const result = await getModel(name).findOne(query, projection).lean()
            return result
        } catch (err) {
            throw err
        }
    },

    find: async (name: ModelNameType, query: Object, projection: string = '-_id -__v', opts: ?Object = null): Promise<Object> => {
        try {
            const result = await getModel(name).find(query, projection, opts).lean()
            return result
        } catch (err) {
            throw err
        }
    },

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
    },

    distinct: async (name: ModelNameType, prop: string): Promise<string[]> => {
        try {
            const result = await getModel(name).distinct(prop)
            return result
        } catch (err) {
            throw err
        }
    }
}
