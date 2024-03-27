import jwt from "jsonwebtoken"
import { pool } from "../config/db.js"
import { filterObject } from "../lib/utils.js"

export async function authenticate(req, res, next) {
  const token = req.headers.authorization.split(" ")[1]

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authenticated, please login",
    })
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    const user = await pool.query(
      `SELECT * FROM ${decodedToken.user.user.type} WHERE email = $1`,
      [decodedToken.user.user.email]
    )

    req.user = {
      ...filterObject(user.rows[0], ["password"]),
      type: decodedToken.user.user.type,
    }

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Request. Token is not valid",
    })
  }
}
