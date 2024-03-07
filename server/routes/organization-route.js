import express from "express"
import {
  donate,
  getAllOrganizations,
} from "../controllers/organization-controller.js"
import { authenticate } from "../middleware/authenticate.js"
const router = express.Router()

router.get("/", getAllOrganizations)
router.post("/donate", donate)

export default router
