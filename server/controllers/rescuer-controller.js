/**
 * @route GET /rescuer/:id
 * @description Get a rescuer and the disaster they are volunteering
 * @param {string} id - ID of the rescuer
 * @access private (rescuer, authority)
 */

import { pool } from "../config/db.js"

export async function getRescuer(req, res) {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ error: "Id is required" })
    }

    const user = req.user
    if (!user || (user.type !== "rescuer" && user.type !== "authority")) {
      return res.status(401).json({
        error: "Unauthorized, only authority and the rescuer can view profile",
      })
    }

    if (user.id !== id && user.type === "rescuer") {
      return res
        .status(401)
        .json({ error: "Unauthorized, you can only view your profile" })
    }

    const query = "SELECT * FROM rescuer WHERE id = $1"
    const disasterQuery = `
    SELECT D.*
    FROM RESCUER_DISASTER RD
    JOIN DISASTER D ON RD.disaster_id = D.id
    WHERE RD.rescuer_id = $1`

    const rescuer = await pool.query(query, [id])
    const disasters = await pool.query(disasterQuery, [id])
    return res
      .status(200)
      .json({ rescuer: rescuer.rows, disasters: disasters.rows })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * @route POST /rescuer/disaster/add/:disaster_id
 * @description Volunteer for a disaster
 * @param {string} disaster-id - ID of the disaster
 * @access private (rescuer)
 */

export async function volunteerForDisaster(req, res) {
  try {
    const user = req.user
    if (!user || user.type !== "rescuer") {
      return res
        .status(401)
        .json({ error: "Unauthorized, only rescuers can volunteer" })
    }

    const { disaster_id } = req.params
    if (!disaster_id) {
      return res.status(400).json({ error: "Disaster ID is required" })
    }

    const query =
      "INSERT INTO rescuer_disaster (rescuer_id, disaster_id) VALUES ($1, $2)"
    await pool.query(query, [user.id, disaster_id])
    return res
      .status(200)
      .json({ message: "Successfully volunteering for disaster" })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
