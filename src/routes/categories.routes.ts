import express from "express"
import { CategoriesController } from "../controllers/categories.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { allowRoles } from "../middleware/role.middleware.js"

const categoriesRouter = express.Router()
const categoriesController = new CategoriesController()

categoriesRouter.get("/", authMiddleware, categoriesController.getCategories)
categoriesRouter.post("/", authMiddleware, allowRoles("ADMIN"), categoriesController.createCategories)
categoriesRouter.delete("/", authMiddleware, allowRoles("ADMIN"), categoriesController.deleteCategories)


export default categoriesRouter
