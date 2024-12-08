import { drizzle } from 'drizzle-orm/node-postgres';
import { /*customUrls,*/ urls } from './schema';

const db = drizzle(process.env.DATABASE_URL);

export default db;
export { /*customUrls,*/ urls };
