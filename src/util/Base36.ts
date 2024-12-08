import { ConversionError } from './Error';

export default class Base36 {
    static #values = new Map([
        ['a', 0],
        ['b', 1],
        ['c', 2],
        ['d', 3],
        ['e', 4],
        ['f', 5],
        ['g', 6],
        ['h', 7],
        ['i', 8],
        ['j', 9],
        ['k', 10],
        ['l', 11],
        ['m', 12],
        ['n', 13],
        ['o', 14],
        ['p', 15],
        ['q', 16],
        ['r', 17],
        ['s', 18],
        ['t', 19],
        ['u', 20],
        ['v', 21],
        ['w', 22],
        ['x', 23],
        ['y', 24],
        ['z', 25],
        ['0', 26],
        ['1', 27],
        ['2', 28],
        ['3', 29],
        ['4', 30],
        ['5', 31],
        ['6', 32],
        ['7', 33],
        ['8', 34],
        ['9', 35],
    ]);

    static decode(base: string, offset: boolean = false) {
        if (!Base36.isValid(base))
            throw new ConversionError({ prc: 'decode', value: base });

        let value = offset ? 1 : 0;
        for (let i = 0; i < base.length; ++i) {
            value += Base36.getValue(base.charAt(i)) * 36 ** (base.length - i - 1);
        }

        return value;
    }

    static encode(num: number, offset: boolean = false) {
        num = offset ? num - 1 : num;

        if (num < 0)
            throw new ConversionError({
                prc: 'encode',
                value: num,
            });
        if (num == 0) return 'a';

        let str = '';
        while (num > 0) {
            str += Base36.getChar(num % 36);
            num = Math.floor(num / 36);
        }

        return str.split('').reverse().join('');
    }

    static getChar(num: number) {
        return String.fromCharCode(num < 26 ? num + 97 : num + 22);
    }

    static getValue(str: string) {
        return Base36.#values.get(str) ?? 0;
    }

    static isValid(base: string) {
        return base.match(/^[a-z0-9]+$/gm) != null;
    }
}
