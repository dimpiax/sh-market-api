/* @flow */

export type ErrorRegionType = 'register' | 'auth' | 'adverts'
export type ErrorType = 'forbidden' | 'badRequest'

export default class APIError {
    static forbidden(region: ErrorRegionType, data: ?Object = null): APIError {
        return new APIError(403, 'forbidden', region, data)
    }

    static badRequest(region: ErrorRegionType, data: ?Object = null): APIError {
        return new APIError(400, 'badRequest', region, data)
    }

    _code: number
    _type: ErrorType
    _region: ErrorRegionType
    _data: ?Object

    get code(): number { return this._code }
    get type(): ErrorType { return this._type }
    get region(): ErrorRegionType { return this._region }
    get data(): ?Object { return this._data }

    constructor(code: number, type: ErrorType, region: ErrorRegionType, data: ?Object) {
        this._code = code
        this._type = type
        this._region = region
        this._data = data
    }
}
