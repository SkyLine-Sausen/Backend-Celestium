import express from "express"
import { CategoriesController } from "../controllers/categories.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const categoriesRouter = express.Router()
const categoriesController = new CategoriesController()

categoriesRouter.get("/", authMiddleware, categoriesController.getCategories)
categoriesRouter.post("/", authMiddleware, categoriesController.createCategories)



export default categoriesRouter
