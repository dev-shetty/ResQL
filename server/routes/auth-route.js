import express from "express"
import {
  createNewRescuer,
  decodeToken,
  login,
  logout,
} from "../controllers/auth-controller.js"
import { authenticate } from "../middleware/authenticate.js"
const router = express.Router()

// Create a new rescuer
router.post("/login/:type", login)
router.post("/rescuer/create", createNewRescuer)
router.get("/logout", authenticate, logout)
router.post("/decode", decodeToken)

export default router
