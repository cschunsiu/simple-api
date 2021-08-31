const db = require('../data-access/database');

async function create(params) {
    try {
        console.log(`Create url with params: ${JSON.stringify(params)} -- start`);
        const { original, shortened } = params;
        const result = await db.query('INSERT INTO url (original, shortened) VALUES ($1, $2)', [original, shortened]);

        return result;
    } finally {
        console.log(`Create url with params: ${JSON.stringify(params)} -- end`);
    }
}

async function getById(params) {
    try {
        console.log(`Get url By Id with params: ${JSON.stringify(params)} -- start`);
        const { id } = params;
        const { rows } = await db.query('SELECT * FROM url WHERE id = $1', [parseInt(id)]);

        return rows[0];
    } finally {
        console.log(`Get url By Id with params: ${JSON.stringify(params)} -- end`);
    }
}

async function getByShortened(params) {
    try {
        console.log(`Get url By Shortened with params: ${JSON.stringify(params)} -- start`);
        const { shortened } = params;
        const { rows } = await db.query('SELECT * FROM url WHERE shortened = $1', [shortened]);

        return rows[0];
    } finally {
        console.log(`Get url By Shortened with params: ${JSON.stringify(params)} -- end`);
    }
}

module.exports = {
    getById,
    create,
    getByShortened,
};
