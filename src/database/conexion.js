const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '12345',
    database: 'academia',
    port: 5432,
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