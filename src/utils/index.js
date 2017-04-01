/* @flow */

export default class Utils {
    static isExistValues(...values: mixed[]): boolean {
        return values.every((el: any): boolean => el != null)
    }
}
