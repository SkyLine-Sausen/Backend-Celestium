import type { Request, Response } from "express"
import { StatusService } from "../services/status.service.js"

const statusService = new StatusService()

export class StatusController {
  async getStatus(req: Request, res: Response) {
    const products = await statusService.findAll()
    res.json(products)
  }
}
