/* @flow */

export default class Logger {
    static _levels: number

    static setLevelsFromIndexes(...rest: number[]) {
        Logger._levels = rest.reduce((prev: number, cur: number): number => prev | (1 << cur), 0)
    }

    static setMaxLevels() {
        Logger._levels = Number.MAX_SAFE_INTEGER
    }

    static setLevels(...rest: Level[]) {
        Logger._levels = rest.reduce((prev: number, cur: Level): number => prev | cur.bit, 0)
    }

    static log(...rest: any[]) {
        const { allow, args } = Logger._processArgs(...rest)
        if (!allow) return

        console.log.apply(null, Logger._getMessageBody(...args))
    }

    static error(...rest: any[]) {
        const { allow, args } = Logger._processArgs(...rest)
        if (!allow) return

        console.error.apply(null, Logger._getMessageBody(...args))
    }

    static _getMessageBody(...rest: any[]): any[] {
        // return [ `sid: ${System.sessionId},`, ...rest ]
        return rest
    }

    static _processArgs(...rest: any[]): { allow: boolean, args: any[] } {
        let allow = true
        const args = rest

        const logLevel = args[0]
        if (logLevel instanceof Level) {
            args.splice(0, 1, `${logLevel.name} |`)
            allow = (Logger._levels & logLevel.bit) !== 0
        }

        return { allow, args }
    }
}

export class Level {
    static get database(): Level { return new Level(1, 'database') }

    index: number
    bit: number
    name: string

    constructor(index: number, name: string) {
        this.index = index
        this.bit = 1 << index
        this.name = name
    }
}

// default log level
Logger.setMaxLevels()
