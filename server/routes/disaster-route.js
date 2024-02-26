import express from "express"
import {
  getAllDisasters,
  getDisasterByLocation,
} from "../controllers/disaster-controller.js"
import { authenticate } from "../middleware/authenticate.js"
const router = express.Router()

router.get("/", getAllDisasters)
router.get("/:location", getDisasterByLocation)

export default router
