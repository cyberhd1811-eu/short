import {
    bigint,
    bigserial,
    boolean,
    pgTable,
    text,
    timestamp,
} from 'drizzle-orm/pg-core';

export default pgTable('urls', {
    id: bigserial('id', {
        mode: 'number',
    }).primaryKey(),
    url: text('url').notNull(),
    secure: boolean('secure').notNull().default(false),
    createdAt: timestamp('created_at', {
        mode: 'date',
        precision: 6,
        withTimezone: true,
    })
        .notNull()
        .defaultNow(),
    count: bigint('count', { mode: 'number' }).notNull().default(0),
    lastUsed: timestamp('last_used', {
        mode: 'date',
        precision: 6,
        withTimezone: true,
    }).$onUpdate(() => new Date()),
});
