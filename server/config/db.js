const { Pool } = require("pg")
const dotenv = require("dotenv").config()

const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  port: 5432,
})

module.exports = { pool }
