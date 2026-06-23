import type { Request, Response } from "express"
import { OrdersService } from "../services/orders.service.js"

const ordersService = new OrdersService()

export class OrdersController {
  async getOrders(req: Request, res: Response) {
    const orders = await ordersService.findAll()
    res.json(orders)
  }

  async insert(req: Request, res: Response) {
    const { userId, items } = req.body

    const order = await ordersService.create(userId, items)
    res.status(201).json(order)
  }
}
