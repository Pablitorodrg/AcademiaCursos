const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('error', (err) => {
    console.error('Error inesperado en el pool de PostgreSQL:', err.message);
});

pool.query('SELECT 1').then(() => {
    console.log('Conectado a PostgreSQL desde Node.js exitosamente');
}).catch(err => {
    console.error('Error al conectar a PostgreSQL:', err.message);
});

module.exports = pool;