import { type TSchema } from '@sinclair/typebox';
import { TypeCompiler } from '@sinclair/typebox/compiler';

export default (schema: TSchema, value: unknown = {}) => {
    const C = TypeCompiler.Compile(schema);

    return C.Check(value);
};
