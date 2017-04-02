/* @flow */

import ModelName from '../../database/model-name'
import dbProxy from '../../database/db-proxy'

import Advert from '../../database/schemas/advert'

export default class AdvertService {
    static async getAdverts({ tag, toSell, interval, name }: { tag: string, toSell: boolean, interval: string, name: string }): Promise<Advert[]> {
        // TODO: implement pagination
        // TODO: implement sort

        const query = {}
        if (tag != null) query.tag = tag
        if (toSell != null) query.toSell = toSell
        if (name != null) query.artName = new RegExp(`^${name}.*`)

        // mould possible range
        if (interval != null) {
            const rangeValue = this._getMongoRangeValue(interval)
            if (rangeValue != null) query.price = rangeValue
        }

        try {
            const result = await dbProxy.find(ModelName.advert, query)
            return result
        } catch (err) {
            throw err
        }
    }

    static _getMongoRangeValue(value: string): ?(number | { gte: number, lte: number }) {
        // expression group strict input number values,
        // searching for alone and range values
        const regExp = /(?:^(\d+)$)|(?:(\d+)?-(\d+)?)/
        const res = regExp.exec(value)
        if (res == null) return null

        const signleValue = res[1]
        if (signleValue != null) {
            // in case input signle number, i.e.: 123
            return parseInt(signleValue, 10)
        }

        // in case input range value, i.e.: 1-, -1, 1-2
        const range = { $gte: res[2], $lte: res[3] }
        const result = Object.keys(range)
            .map((el: string): ?Object => {
                const number = range[el]
                if (number == null) return null
                return { [el]: parseInt(number, 10) }
            })
            .filter(Boolean)

        return result.length > 0 ? Object.assign({}, ...result) : null
    }
}
