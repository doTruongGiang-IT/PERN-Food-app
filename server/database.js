const Pool = require("pg").Pool;

const pool = new Pool({
    user: "<<your usrename here>>",
    password: "<<your password here>>",
    database: "httt_dn",
    host: "localhost",
    port: 5432,
});

module.exports = pool;
