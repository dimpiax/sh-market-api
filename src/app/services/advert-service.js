/* @flow */

import ModelName from '../../database/model-name'
import dbProxy from '../../database/db-proxy'

import Advert from '../../database/schemas/advert'

export default class AdvertService {
    static async getAdverts({ tag, toSell, price, name, sort, start, limit }: { tag: string, toSell: boolean, price: string, name: string, sort: string, start: string, limit: string }): Promise<Advert[]> {
        const query = {}
        if (tag != null) query.tags = tag
        if (toSell != null) query.toSell = toSell

        // need to define, which symbols can includes article's name
        // to propose better expression
        if (name != null) query.artName = new RegExp(`^${name}.*`, 'i')

        // mould possible range
        if (price != null) {
            const rangeValue = this._getMongoRangeValue(price)
            if (rangeValue != null) query.price = rangeValue
        }

        // setup options
        const options = {}

        // implement sorting
        if (sort != null) options.sort = { [sort]: 1 }

        // implement pagination
        const pageOpt = this._getPageOptions(start, limit)
        if (pageOpt != null) Object.assign(options, pageOpt)

        try {
            const result = await dbProxy.find(ModelName.advert, query, undefined, options)
            return result
        } catch (err) {
            throw err
        }
    }

    static async getDistinctValues(name: string): Promise<string[]> {
        try {
            const result = await dbProxy.distinct(ModelName.advert, name)
            return result
        } catch (err) {
            throw err
        }
    }

    // PRIVATE
    static _getMongoRangeValue(value: string): ?(number | { gte: number, lte: number }) {
        // expression group strict input double values,
        // searching for alone and range values
        const regExp = /(?:^((?:\d\.?)+)$)|(?:^((?:\d\.?)+)?-((?:\d\.?)+)?$)/
        const res = regExp.exec(value)
        if (res == null) return null

        const signleValue = res[1]
        if (signleValue != null) {
            // in case input signle number, i.e.: 123
            return parseFloat(signleValue, 10)
        }

        // in case input range value, i.e.: 1-, -1, 1-2
        const range = { $gte: res[2], $lte: res[3] }
        const result = Object.keys(range)
            .map((el: string): ?Object => {
                const number = range[el]
                if (number == null) return null
                return { [el]: parseFloat(number, 10) }
            })
            .filter(Boolean)

        return result.length > 0 ? Object.assign({}, ...result) : null
    }

    static _getPageOptions(startValue: string, limitValue: string): ?{ skip: number, limit: number } {
        const start = parseInt(startValue, 10)
        const limit = parseInt(limitValue, 10)
        if (isNaN(start) || isNaN(limit)) return null

        const skip = start * limit
        return { skip, limit }
    }
}
