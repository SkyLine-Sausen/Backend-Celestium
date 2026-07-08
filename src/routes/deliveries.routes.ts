import express from "express"
import { DeliveriesController } from "../controllers/deliveries.controller.js"
import { minecraftApiKeyMiddleware } from "../middleware/minecraftApiKey.middleware.js"

const deliveriesRouter = express.Router()
const deliveriesController = new DeliveriesController()

deliveriesRouter.get(
  "/pending",
  minecraftApiKeyMiddleware,
  deliveriesController.getPending
)

deliveriesRouter.post(
  "/confirm",
  minecraftApiKeyMiddleware,
  deliveriesController.confirm
)

export default deliveriesRouter