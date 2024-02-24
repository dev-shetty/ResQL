const { Pool } = require("pg")

const pool = new Pool({
  user: "postgres",
  database: "resqldb",
  password: "password",
  host: "localhost",
  port: 5432,
})

module.exports = { pool }
