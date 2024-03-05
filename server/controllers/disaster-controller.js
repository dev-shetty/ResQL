import { pool } from "../config/db.js"
import { disasterSchema } from "../lib/schemas.js"

/**
 * @route GET /disaster
 * @description Gets all the disaster
 * @access public
 */
export async function getAllDisasters(req, res) {
  try {
    const query = "SELECT * FROM disaster ORDER BY date DESC"
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
      "SELECT * FROM disaster WHERE city = $1 OR state = $1 OR country = $1 ORDER BY date DESC"
    const disaster = await pool.query(query, [location])
    return res.status(200).json({ disaster: disaster.rows })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * @route GET /disaster/:id
 * @param {string} id - ID of the disaster
 * @description Gets all the disaster by ID
 * @access public
 */
export async function getDisasterById(req, res) {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ error: "Id is required" })
    }

    const query = "SELECT * FROM disaster WHERE id = $1"
    const rescuerQuery = `
    SELECT R.*
    FROM RESCUER_DISASTER RD
    JOIN RESCUER R ON RD.rescuer_id = R.id
    WHERE RD.disaster_id = $1`

    const disaster = await pool.query(query, [id])
    const rescuers = await pool.query(rescuerQuery, [id])

    return res
      .status(200)
      .json({ disaster: disaster.rows, rescuers: rescuers.rows })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * @route POST /disaster
 * @description Report a new Disaster
 * @requires id (autogenerated), authority_id (fetched), type, name, description, date, city, state, country, people affected, severity
 * @access private (authority)
 */
export async function reportDisaster(req, res) {
  try {
    const user = req.user
    if (!user || user.type !== "authority") {
      return res
        .status(401)
        .json({ error: "Unauthorized, only authorities can report a disaster" })
    }

    const disaster = { ...req.body, authority_id: user.id }

    const parsedDisaster = disasterSchema.safeParse(disaster)
    if (!parsedDisaster.success) {
      return res.status(400).json({ error: parsedDisaster.error })
    }
    const disasterData = parsedDisaster.data

    const query = `INSERT INTO disaster (id, authority_id, type, name, description, date, city, state, country, people_affected, severity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`
    const disasterResult = await pool.query(query, [
      disasterData.id,
      disasterData.authority_id,
      disasterData.type,
      disasterData.name,
      disasterData.description,
      disasterData.date,
      disasterData.city.toLowerCase(),
      disasterData.state.toLowerCase(),
      disasterData.country.toLowerCase(),
      disasterData.people_affected,
      disasterData.severity,
    ])
    return res.status(201).json({
      message: "Disaster reported successfully",
      disaster_id: disasterResult.rows[0].id,
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * @route PUT /disaster/edit/:id
 * @description Update People affected in disaster
 * @param {string} id - ID of the disaster
 * @requires authority_id (fetched), people affected, severity
 * @access private (authority)
 */

export async function editDisaster(req, res) {
  try {
    const user = req.user
    if (!user || user.type !== "authority") {
      return res
        .status(401)
        .json({ error: "Unauthorized, only authorities can edit disaster" })
    }
    const { id } = req.params
    const disaster = { ...req.body, authority_id: user.id, id }
    const query =
      "UPDATE disaster SET people_affected = $1, severity = $2 WHERE id = $3 RETURNING *"

    const currentDisaster = await pool.query(
      "SELECT * FROM disaster WHERE id = $1",
      [disaster.id]
    )

    const disasterResult = await pool.query(query, [
      disaster.people_affected ?? currentDisaster.rows[0].people_affected,
      disaster.severity ?? currentDisaster.rows[0].severity,
      disaster.id,
    ])
    if (!disasterResult) {
      return res.status(400).json({ error: "Error updating disaster" })
    }
    return res.status(200).json({
      message: "Disaster updated successfully",
      disaster: disasterResult.rows[0],
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
