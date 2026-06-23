import type { Request, Response } from "express"
import { ProductsService } from "../services/products.service.js"

const productsService = new ProductsService()

export class ProductsController {
  async getProducts(req: Request, res: Response) {
    const products = await productsService.findAll()
    res.json(products)
  }

  async createProduct(req: Request, res: Response) {
    const {
      name,
      categoryId,
      description,
      price,
      image,
      badge,
      available,
      tag,
      rating,
    } = req.body
    const product = await productsService.insert({
      name,
      categoryId,
      description,
      price,
      image,
      badge,
      available,
      tag,
      rating,
    })
    res.status(201).json(product)
  }
}
