import { prisma } from "../lib/prisma.js"

export class StatusService {
  async findAll() {
    return await prisma.orderStatus.findMany({
      orderBy: { id: "asc" },
    })
  }
}
