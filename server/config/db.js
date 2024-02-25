import dotenv from "dotenv"
import postgres from "pg"
const { Pool } = postgres

dotenv.config()

export const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  port: 5432,
})
