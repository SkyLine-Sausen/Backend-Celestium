import type { Request, Response } from "express"
import { CategoriesService } from "../services/categories.service.js"

const categoriesService = new CategoriesService()

export class CategoriesController {
  async getCategories(req: Request, res: Response) {
    // console.log("Buscando categorias...")
    const categories = await categoriesService.findAll()
    res.json(categories)
  }
}
