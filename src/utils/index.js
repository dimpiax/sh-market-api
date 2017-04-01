/* @flow */

export default class Utils {
    static isExistValues(...values: mixed[]): boolean {
        return values.every((el: any): boolean => el != null)
    }

    static isExistValue(obj: Object, ...props: string[]): boolean {
        return Utils.getValue(obj, ...props) != null
    }

    static getValue(obj: Object, ...props: string[]): ?any {
        const data = Utils._getLastChainData(obj, ...props)
        if (data == null) return null
        return data.o[data.prop]
    }

    // PRIVATE
    static _getLastChainData(obj: Object, ...props: string[]): ?{ o: Object, prop: string } {
        if (props == null) throw new Error('Need to set looking properties path')

        if (obj == null) return null

        let chainData: { o: Object, prop: string }
        let value = obj
        const lastIndex = props.length - 1
        const result = props.every((prop: string, index: number): boolean => {
            if (!Object.prototype.hasOwnProperty.call(value, prop)) return false
            if (index < lastIndex) value = value[prop]
            else {
                chainData = { o: value, prop }
            }
            return true
        })

        return result ? chainData : null
    }
}
