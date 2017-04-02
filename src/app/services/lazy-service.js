/* @flow */

import path from 'path'
import fs from 'fs'

import config from '../../config'

export type LazyServiceDataType = 'errorMessages'

class LazyService {
    _storedData: Map<LazyServiceDataType, ?Object>

    refresh() {
        this._storedData = new Map()
    }

    getData(key: LazyServiceDataType): ?Object {
        if (this._storedData == null) {
            this.refresh()
        }

        if (!this._storedData.has(key)) {
            const uri = this._getFileURI(key)
            if (uri == null) return null

            const json = this._getJSONFile(uri)
            this._storedData.set(key, json)
        }

        return this._storedData.get(key)
    }

    _getFileURI(value: LazyServiceDataType): ?string {
        switch (value) {
            case 'errorMessages': return config.errors.externalMessagesURI

            default: break
        }

        return null
    }

    _getJSONFile(uri: string): ?Object {
        try {
            const result = fs.readFileSync(path.resolve(uri), { encoding: 'utf-8' })
            return JSON.parse(result)
        }
        catch (err) {
            return null
        }
    }
}

const instance = new LazyService()
export default instance
