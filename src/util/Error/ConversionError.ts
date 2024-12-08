import { BaseError } from '.';

export default class ConversionError extends BaseError {
    constructor({ prc, value }: { prc: 'encode' | 'decode'; value: string | number }) {
        super();

        console.log('Process: ' + prc + ' failed!\n' + value + ' is not correct!');
    }
}
