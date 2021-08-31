const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'zc8940d67-postgresql.qovery.io',
    database: 'db',
    password: 'Or6FR0DG4fequHye',
    port: 5432,
})

module.exports = {
    query: (text, params) => pool.query(text, params),
}
