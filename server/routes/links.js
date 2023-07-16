import express from "express"
import { getLinks, getLink, createLink, deleteLink } from "../controllers/links.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.use(verifyToken)

router.route("/").get(getLinks).post(createLink)

router.route("/:id").get(getLink).delete(deleteLink)

export default router;