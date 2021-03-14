const { Pool } = require('pg');
const pool = new Pool({
    host: 'cloudappi-db.c8mhytthxqqc.us-east-2.rds.amazonaws.com',
    user: 'postgres',
    password: 'password',
    database: 'cloudappi',
    port: '5432'
});

module.exports = pool;