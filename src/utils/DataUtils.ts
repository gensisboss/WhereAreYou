/**
* 
* @ brief: DataUtils
* @ author: zyh
* @ data: 2023-09-20 17:59
*/
export class DataUtils {
    static copy(data: any) {
        if (!data) return null;
        return JSON.parse(JSON.stringify(data));
    }

    static deepEqual(a: any, b: any) {
        if (a === b) {
            return true;
        }

        if (typeof a != typeof b) {
            return false;
        }

        if (a == null || b == null || typeof a != 'object') {
            return false;
        }

        let keysA = Object.keys(a);
        let keysB = Object.keys(b);

        if (keysA.length != keysB.length) {
            return false;
        }

        for (let key of keysA) {
            if (!keysB.includes(key)) {
                return false;
            }

            if (!DataUtils.deepEqual(a[key], b[key])) {
                return false;
            }
        }

        return true;
    }
}