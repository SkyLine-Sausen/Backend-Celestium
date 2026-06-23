import express from "express"
import { ProductsController } from "../controllers/products.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const productsRouter = express.Router()
const productsController = new ProductsController()

productsRouter.get("/", authMiddleware, productsController.getProducts)
productsRouter.post("/", authMiddleware, productsController.createProduct)

export default productsRouter
