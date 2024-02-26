import express from "express"
import { createNewRescuer, login } from "../controllers/auth-controller.js"
const router = express.Router()

// Create a new rescuer
router.post("/login/:type", login)
router.post("/rescuer/create", createNewRescuer)

export default router
