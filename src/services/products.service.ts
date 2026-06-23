import type { Product } from "../../generated/prisma/client.js"
import { prisma } from "../lib/prisma.js"
import { randomUUID } from "node:crypto"

export class ProductsService {
  async findAll() {
    return await prisma.product.findMany({
      orderBy: { id: "asc" },
    })
  }

  async insert(data: {
    name: string
    categoryId: string
    description: string
    price: number
    image: string
    badge?: string
    available?: boolean
    tag?: string
    rating?: number
  }): Promise<Product> {
    return await prisma.product.create({
      data: {
        id: randomUUID(),
        ...data,
      },
    })
  }
}
