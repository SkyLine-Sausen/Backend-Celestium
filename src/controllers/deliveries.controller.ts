import type { Request, Response } from "express"
import { DeliveriesService } from "../services/deliveries.service.js"

const deliveriesService = new DeliveriesService()

export class DeliveriesController {
  async getPending(req: Request, res: Response) {
    try {
      const server =
        typeof req.query.server === "string" && req.query.server.trim()
          ? req.query.server
          : "main"

      const deliveries = await deliveriesService.findPending(server)

      res.json(deliveries)
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "Erro ao buscar entregas pendentes",
      })
    }
  }

  async confirm(req: Request, res: Response) {
    try {
      const { id } = req.body

      if (!id || typeof id !== "string") {
        return res.status(400).json({
          error: "id obrigatorio",
        })
      }

      const result = await deliveriesService.confirm(id)

      res.json({
        ok: true,
        updated: result.count > 0,
      })
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "Erro ao confirmar entrega",
      })
    }
  }
}