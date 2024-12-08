import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';

import { redirector } from './redirector';

const start = async () => {
    new Elysia({
        // analytic
        aot: false,
        // cookie
        // detail
        experimental: false,
        // handler
        name: 'cyberhd.link',
        // nativeStaticResponse
        normalize: false,
        // precompile
        // prefix
        // scoped
        seed: '/',
        // serve
        strictPath: false,
        // tags
        // websocket
    })
        .use(swagger())
        .use(redirector())
        .listen(
            /*{
                // ca
                // cert
                // development
                // dhParamsFile
                // error
                // fetch
                // hostname: 'cyberhd.link',
                // id
                // idleTimeout
                // key
                // lowMemoryMode
                // maxRequestBodySize
                // passphrase
                port: +process.env.LINK_PORT,
                // rejectUnauthorized
                // requestCert
                // reusePort
                // secureOptions
                serverName: 'cyberhd.link',
                // static
                // tls
                // unix
                // websocket
            }*/ +process.env.LINK_PORT,
            (serverInstance) => {
                console.log(
                    'cyberhd.link is now online on: "' +
                        serverInstance.hostname +
                        ':' +
                        serverInstance.port +
                        '"'
                );
            }
        );
};

export default { start };
