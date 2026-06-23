import { prisma } from "../lib/prisma.js"

export type Item = {
  productId: string
  name: string
  price: number
  quantity: number
}

export class OrdersService {
  async findAll() {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        status: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return orders.map((order) => ({
      ...order,
      items: order.items.map((item) => ({
        productId: item.productId,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
    }))
  }

  async create(userId: string, items: Item[]) {
    const order = await prisma.order.create({
      data: {
        userId,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            value: item.price * item.quantity,
          })),
        },
      },
      include: {
        user: true,
        status: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    return {
      ...order,
      items: order.items.map((item) => ({
        productId: item.productId,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
    }
  }
}
