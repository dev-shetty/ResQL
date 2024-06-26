import express from "express"
import {
  deleteDisaster,
  editDisaster,
  getAllDisasters,
  getDisasterById,
  getDisasterByLocation,
  reportDisaster,
} from "../controllers/disaster-controller.js"
import { authenticate } from "../middleware/authenticate.js"
const router = express.Router()

router.get("/", getAllDisasters)
router.get("/location/:location", getDisasterByLocation)
router.get("/:id", getDisasterById)
router.post("/", authenticate, reportDisaster)
router.put("/edit/:id", authenticate, editDisaster)
router.delete("/:id", authenticate, deleteDisaster)

export default router
