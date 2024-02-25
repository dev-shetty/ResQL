import fs from "fs"
import path from "path"
import { pool } from "../config/db"

/**
 * @description Seeds the postgres database with predefined data given in seed/migrate.sql file
 */
async function seedDatabase() {
  try {
    const sqlQueries = fs.readFileSync(
      path.join(__dirname, "migrate.sql"),
      "utf8"
    )

    if (!sqlQueries) {
      throw new Error("Queries not found in the seeding SQL file")
    }
    await pool.query(sqlQueries)
    console.log("Data seeding completed successfully, wait for a while...")
  } catch (error) {
    console.error("Error seeding data:", error)
  }
}

seedDatabase()
