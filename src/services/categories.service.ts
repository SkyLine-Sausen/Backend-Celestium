import type { Request, Response } from "express"
import { prisma } from "../lib/prisma.js"
import type { Categoria } from "../types/Categoria.js"
import { randomUUID } from "node:crypto"

export class CategoriesService {
  async findAll() {
    return await prisma.category.findMany({
      orderBy: { id: "asc" },
    })
  }

  
  async insert(data: {
    label: string
    icon: string
  }): Promise<Categoria> {
    return await prisma.category.create({
      data: {
        id: randomUUID(),
        ...data
      },
    })
  }    



}
