const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})

module.exports = {
    query: (text, params) => pool.query(text, params),
}
