import type { Request, Response } from "express"
import { CategoriesService } from "../services/categories.service.js"

const categoriesService = new CategoriesService()

export class CategoriesController {
  async getCategories(req: Request, res: Response) {
    // console.log("Buscando categorias...")
    const categories = await categoriesService.findAll()
    res.json(categories)
  }

  async createCategories(req:Request, res:Response) {
    const {
      label,
      icon,
    } = req.body

    const categoria = await categoriesService.insert({label, icon})

    res.status(201).json(categoria)
  }  

  async deleteCategories(req: Request, res: Response) {
          try {
            const id = String(req.params.id)
      
            await categoriesService.delete(id)
      
            return res.status(204).send()
          } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Erro ao remover categoria" })
          }
        }
  
}
