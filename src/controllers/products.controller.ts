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
      available,
      tag,
      rating,
    })
    res.status(201).json(product)
  }

  async updateProduct (req: Request, res: Response) {
        try {
          console.log(req.params.id)
            const id = String(req.params.id);
            const { 
              name, 
              categoryId, 
              description, 
              price, 
              image, 
              available, 
              tag, 
              rating 
            }= req.body;

            const produto = await productsService.update(
              id,  
              name, 
              categoryId, 
              description, 
              price, image, 
              available, 
              tag, 
              rating 
            );
            res.json(produto);
        } catch (err) {
            res.status(500).json({ error: 'Erro ao atualizar produto' });
        }
    }
}
