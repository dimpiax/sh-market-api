/* @flow */

export type ModelNameType = 'advert' | 'user'

export default class ModelName {
    static get advert(): ModelNameType { return 'advert' }
    static get user(): ModelNameType { return 'user' }
}
