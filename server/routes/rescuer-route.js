import express from "express"
import {
  getRescuer,
  volunteerForDisaster,
} from "../controllers/rescuer-controller.js"
import { authenticate } from "../middleware/authenticate.js"
const router = express.Router()

router.get("/:id", authenticate, getRescuer)
router.post("/disaster/add/:disaster_id", authenticate, volunteerForDisaster)

export default router
