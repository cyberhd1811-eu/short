import { Elysia, t } from 'elysia';

import db, { urls } from '../db';
import { Base36 } from '../util';

export const creator = () => {
    return new Elysia({
        // analytic
        aot: false,
        // cookie
        // detail
        experimental: false,
        // handler
        name: 'short.cyberhd1811.eu_creator',
        // nativeStaticResponse
        normalize: false,
        // precompile
        prefix: '',
        // scoped
        seed: '/',
        // serve
        strictPath: false,
        // tags
        // websocket
    }).post(
        '/create',
        async ({ body: { url } }) => {
            const [protocol, urlPath] = url.split('://');
            const res = await db
                .insert(urls)
                .values({ url: urlPath!, secure: protocol?.endsWith('s')! })
                .returning({
                    id: urls.id,
                });

            return (
                (process.env.NODE_ENV === 'development'
                    ? 'http://localhost:8010/u/'
                    : 'https://cyberhd.link/u/') + Base36.encode(res[0]!.id, true)
            );
        },
        {
            body: t.Object({
                url: t.String({
                    pattern:
                        'https?://(?:www.)?([-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b)*(/[/dw.-]*)*(?:[?])*(.+)*',
                }),
            }),
        }
    );
};
