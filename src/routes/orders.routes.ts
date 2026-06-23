import express from "express"
import { OrdersController } from "../controllers/orders.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const ordersRouter = express.Router()
const ordersController = new OrdersController()

ordersRouter.get("/", authMiddleware, ordersController.getOrders)
ordersRouter.post("/", authMiddleware, ordersController.insert)

export default ordersRouter
