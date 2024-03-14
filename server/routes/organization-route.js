import express from "express"
import {
  donate,
  getAllOrganizations,
  getDonations,
} from "../controllers/organization-controller.js"
import { authenticate } from "../middleware/authenticate.js"
const router = express.Router()

router.get("/", getAllOrganizations)
router.post("/donate", donate)
router.get("/donation", getDonations)

export default router
