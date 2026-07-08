import express from "express"
import { ProductsController } from "../controllers/products.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { allowRoles } from "../middleware/role.middleware.js"

const productsRouter = express.Router()
const productsController = new ProductsController()

productsRouter.get("/",  productsController.getProducts)
productsRouter.post("/", authMiddleware, allowRoles("ADMIN"), productsController.createProduct)
productsRouter.put("/:id", authMiddleware, allowRoles("ADMIN"), productsController.updateProduct)

export default productsRouter
