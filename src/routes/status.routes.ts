import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { StatusController } from "../controllers/status.controller.js"

const statusRouter = express.Router()
const statusController = new StatusController()

statusRouter.get("/", authMiddleware, statusController.getStatus)

export default statusRouter
