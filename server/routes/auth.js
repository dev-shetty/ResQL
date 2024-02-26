import express from "express"
import { createNewRescuer } from "../controllers/auth.js"
const router = express.Router()

// Create a new rescuer
router.post("/rescuer/create", createNewRescuer)

export default router
