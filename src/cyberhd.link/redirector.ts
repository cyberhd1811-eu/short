import { eq } from 'drizzle-orm';
import { Elysia } from 'elysia';

import db, { urls } from '../db';
import { Base36 } from '../util';

export const redirector = () => {
    return new Elysia({
        // analytic
        aot: false,
        // cookie
        // detail
        experimental: false,
        // handler
        name: 'cyberhd.link_redirector',
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
    })
        .get('/u/:id', async ({ params: { id }, redirect }) => {
            const res = await db
                .select()
                .from(urls)
                .where(eq(urls.id, Base36.decode(id, true)));

            if (res.length === 0) return 'NOT FOUND';
            else {
                const url = res[0]!;

                await db
                    .update(urls)
                    .set({
                        count: url.count + 1,
                    })
                    .where(eq(urls.id, url.id));

                return redirect('http' + (url.secure ? 's' : '') + '://' + url.url);
            }
        })
        .get('/:id', async ({ params: { id }, redirect }) => {
            const res = await db
                .select()
                .from(urls)
                .where(eq(urls.id, Base36.decode(id, true)));

            if (res.length === 0) return 'NOT FOUND';
            else {
                const url = res[0]!;

                await db
                    .update(urls)
                    .set({
                        count: url.count + 1,
                    })
                    .where(eq(urls.id, url.id));

                return redirect('http' + (url.secure ? 's' : '') + '://' + url.url);
            }
        });
};
