const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "uocgitrungso_1",
    database: "httt_dn",
    host: "localhost",
    port: 5432,
});

module.exports = pool;