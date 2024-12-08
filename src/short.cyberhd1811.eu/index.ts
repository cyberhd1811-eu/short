import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';

import { creator } from './creator';

const start = async () => {
    new Elysia({
        // analytic
        aot: false,
        // cookie
        // detail
        experimental: false,
        // handler
        name: 'short.cyberhd1811.eu',
        // nativeStaticResponse
        normalize: false,
        // precompile
        // prefix:
        // scoped
        seed: '/',
        // serve
        strictPath: false,
        // tags
        // websocket
    })
        .use(swagger())
        .use(creator())
        .listen(
            /*{
                // ca
                // cert
                // development
                // dhParamsFile
                // error
                // fetch
                // hostname
                // id
                // idleTimeout
                // key
                // lowMemoryMode
                // maxRequestBodySize
                // passphrase
                // port,
                // rejectUnauthorized
                // requestCert
                // reusePort
                // secureOptions
                // serverName
                // static
                // tls
                // unix
                // websocket
            }*/ +process.env.SHORT_PORT,
            (serverInstance) => {
                console.log(
                    'short.cyberhd1811.eu is now online on: "' +
                        serverInstance.hostname +
                        ':' +
                        serverInstance.port +
                        '"'
                );
            }
        );
};

export default { start };
