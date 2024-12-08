import { Type, type Static } from '@sinclair/typebox';

import cyberhd_link from './cyberhd.link';
import short_cyberhd1811_eu from './short.cyberhd1811.eu';
import { check, e } from './util';

const envVariables = Type.Required(
    Type.Object({
        DATABASE_URL: Type.String(),
        NODE_ENV: Type.String(),
        SHORT_PORT: Type.String(),
        LINK_PORT: Type.String(),
    })
);

declare global {
    namespace NodeJS {
        interface ProcessEnv extends Static<typeof envVariables> {}
    }
}

try {
    if (!check(envVariables, process.env)) throw new e.CheckError('env');

    await cyberhd_link.start();
    await short_cyberhd1811_eu.start();
} catch (e) {
    // TODO Error Handling
    console.error(e);
}
