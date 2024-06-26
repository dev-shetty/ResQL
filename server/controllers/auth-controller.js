import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { pool } from "../config/db.js"
import { LENGTH_OF_ID } from "../lib/constants.js"
import { loginSchema, rescuerSchema } from "../lib/schemas.js"
import {
  filterObject,
  generateToken,
  generate_nanoId,
  hashPassword,
} from "../lib/utils.js"

/**
 * @route POST /auth/rescuer/create
 * @description Creates a new rescuer
 * @requires id (autogenerated), name, phone, email, city, state, country, skills
 * @access public
 */

export async function createNewRescuer(req, res) {
  try {
    const rescuer_id = generate_nanoId(LENGTH_OF_ID, "RES")
    const parsedBody = rescuerSchema.safeParse({ ...req.body, id: rescuer_id })

    if (!parsedBody.success) {
      return res.status(400).json({ error: parsedBody.error })
    }
    const rescuer = parsedBody.data

    const isRescuerPresentQuery = `
      SELECT
        CASE
          WHEN COUNT(*) > 0 THEN true
          ELSE false
        END
      FROM rescuer WHERE email = $1
      `

    const rescuerQuery =
      "INSERT INTO rescuer (id, name, phone, email, password, city, state, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *"

    const rescuerSkillQuery =
      "INSERT INTO rescuer_skills (rescuer_id, skill_id) VALUES ($1, (SELECT id FROM skills WHERE skill= $2 )) RETURNING *"

    const isRescuerPresent = await pool.query(isRescuerPresentQuery, [
      rescuer.email,
    ])

    if (isRescuerPresent.rows[0].case) {
      return res.status(400).json({ error: "Email already registered" })
    }

    // This needs to be awaited otherwise it returns promise
    const hashedPassword = await hashPassword(rescuer.password)

    // Inserts the rescuer
    const rescuerResult = await pool.query(rescuerQuery, [
      rescuer.id,
      rescuer.name,
      rescuer.phone,
      rescuer.email,
      hashedPassword,
      rescuer.city.toLowerCase(),
      rescuer.state.toLowerCase(),
      rescuer.country.toLowerCase(),
    ])

    if (!rescuerResult) {
      return res.status(400).json({ error: "Error creating rescuer" })
    }

    // Goes through all the skills and sends query to insert them individually in rescuer_skills table
    if (rescuer.skills) {
      for (const skill of rescuer.skills) {
        const skill_result = await pool.query(rescuerSkillQuery, [
          rescuer.id,
          skill,
        ])
        if (!skill_result) {
          return res
            .status(400)
            .json({ error: "Error creating rescuer skills" })
        }
      }
    }

    res.status(201).json({
      success: true,
      message: "Rescuer created successfully",
      rescuer: filterObject(rescuerResult.rows[0], ["password"]),
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * @route POST /auth/login/:type
 * @param {string} type - Type of user (rescuer, authority, organization) default rescuer
 * @description Logs in to rescuer, authority, organization
 * @requires email, password
 * @access public
 */

export async function login(req, res) {
  try {
    const body = { ...req.body, type: req.params.type }

    const parsedBody = loginSchema.safeParse(body)
    if (!parsedBody.success) {
      return res.status(400).json({ error: parsedBody.error })
    }
    const loginCreds = parsedBody.data

    const query = `SELECT * FROM ${loginCreds.type} WHERE email = $1`

    const user = await pool.query(query, [loginCreds.email])
    if (!user.rows[0]) {
      return res
        .status(400)
        .json({ error: `Email is not registered as ${loginCreds.type}.` })
    }

    const isPasswordCorrect = await bcryptjs.compare(
      loginCreds.password,
      user.rows[0].password
    )

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials" })
    }

    const _user = filterObject(user.rows[0], ["password"])

    const disasters = await pool.query(
      "SELECT disaster_id FROM rescuer_disaster WHERE rescuer_id = $1",
      [_user.id]
    )

    const token = generateToken({
      user: { ..._user, type: loginCreds.type },
    })

    res
      .cookie("access_token", token)
      .status(200)
      .json({
        success: true,
        token: token,
        message: "Logged in successfully",
        user: {
          ..._user,
          type: loginCreds.type,
          disasters: disasters.rows ?? "",
        },
      })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * @route GET /auth/logout
 * @description Logs out the user
 * @access private
 */

export async function logout(req, res) {
  res.clearCookie("access_token").json({
    success: true,
    message: "Logged out successfully",
  })
}
/**
 * @route GET /auth/decode
 * @description Decodes the token and returns user information
 * @access private
 */

export async function decodeToken(req, res) {
  try {
    const { token } = req.body
    const data = jwt.verify(token, process.env.JWT_SECRET)

    res.status(200).json({ success: true, message: "Token decoded", user })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
