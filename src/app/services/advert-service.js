/* @flow */

import ModelName from '../../database/model-name'
import dbProxy from '../../database/db-proxy'

import Advert from '../../database/schemas/advert'

export default class AdvertService {
    static async getAdverts({ tag, toSell, interval, name }: { tag: string, toSell: boolean, interval: string, name: string }): Promise<Advert[]> {
        let query = { tag, toSell }

        // TODO: parse interval to min/max object format
        // TODO: wrap name in regex

        try {
            const result = await dbProxy.find(ModelName.advert, query)
            return result
        } catch (err) {
            throw err
        }
    }
}
