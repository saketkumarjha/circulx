import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.PGSQL_USER,
    host: process.env.PGSQL_HOST,
    database: process.env.PGSQL_DATABASE,
    password: process.env.PGSQL_PASSWORD,
    port: Number(process.env.PGSQL_PORT),
});

export default pool;