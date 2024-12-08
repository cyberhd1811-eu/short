import BaseError from './BaseError';

type CheckErrorScope = 'env';

export default class CheckError extends BaseError {
    #scope: CheckErrorScope;

    constructor(scope: CheckErrorScope) {
        super();

        this.#scope = scope;
    }

    public get scope() {
        return this.#scope;
    }
}
