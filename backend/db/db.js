const {Pool} = require('pg');

const pool = new Pool({
    user: "thomashayes",
    host: "localhost",
    database: "happy_tracker",
    port: 5432
})

module.exports = pool;