import { Router } from "express"
import {createCard} from "../controller/vcardController.js"
import { verifyToken } from "../middleware/auth.js"

const router = Router()

router.post("/", verifyToken, createCard)

export default router