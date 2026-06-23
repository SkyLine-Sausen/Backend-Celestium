import { prisma } from "../lib/prisma.js"

export class CategoriesService {
  async findAll() {
    return await prisma.category.findMany({
      orderBy: { id: "asc" },
    })
  }
}
