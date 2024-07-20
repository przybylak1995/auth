const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "test",
    password: "postgres",
    port: 5432,
});

pool.connect(function(error) {
    if (error) throw error;
    console.log("Database is connected!");

    const query = `
		DROP TABLE IF EXISTS users CASCADE;
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            firstname VARCHAR(50) NOT NULL,
            lastname VARCHAR(50) NOT NULL,
            password VARCHAR(100) NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            type VARCHAR(50) NOT NULL
        )
    `;

    pool.query(query, (error, res) => {
        if (!error) {
            console.log('Table created successfully');
        } else {
            console.log(error.message);
        }
    });
});

module.exports = pool;
