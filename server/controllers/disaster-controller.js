import { pool } from "../config/db.js"

/**
 * @route GET /disaster
 * @description Gets all the disaster
 * @access public
 */
export async function getAllDisasters(req, res) {
  try {
    const query = "SELECT * FROM disaster"
    const disasters = await pool.query(query)
    return res.status(200).json({ disasters: disasters.rows })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * @route GET /disaster/:location
 * @param {string} location - Location of the disaster
 * @description Gets all the disaster from specific location
 * @access public
 */
export async function getDisasterByLocation(req, res) {
  try {
    const { location } = req.params
    if (!location) {
      return res.status(400).json({ error: "Location is required" })
    }

    const query =
      "SELECT * FROM disaster WHERE city = $1 OR state = $1 OR country = $1"
    const disaster = await pool.query(query, [location])
    return res.status(200).json({ disaster: disaster.rows })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
