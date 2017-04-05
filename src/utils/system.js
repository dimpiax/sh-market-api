/* @flow */

class CLIArguments {
    _dbHost: ?string
    _dbName: ?string
    _dbPort: ?number

    get dbHost(): ?string { return this._dbHost }
    get dbName(): ?string { return this._dbName }
    get dbPort(): ?number { return this._dbPort }

    constructor(value: string[]) {
        // database values
        this._dbHost = this._findPair(value, ['--dbHost', '--dbh'])
        this._dbName = this._findPair(value, ['--dbName', '--dbn'])

        // convert value to number
        const dbPort = this._findPair(value, ['--dbPort', '--dbp'])
        if (dbPort != null) this._dbPort = parseInt(dbPort, 10)
    }

    _findPair(base: string[], keysCase: string[]): ?string {
        const index = base.findIndex((el: string): boolean => keysCase.indexOf(el) !== -1)
        if (index === -1) return null

        if (index === base.length - 1) return 'true'
        if (base[index + 1].indexOf('-') === 0) return 'true'

        return base[index + 1]
    }
}

const cliArgs = new CLIArguments(process.argv.slice(2))

export default {
    get cliArgs(): CLIArguments { return cliArgs }
}
