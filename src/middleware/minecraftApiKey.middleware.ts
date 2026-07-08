import type { NextFunction, Request, Response } from "express"

export function minecraftApiKeyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const expectedApiKey = process.env.MC_API_KEY

  if (!expectedApiKey) {
    return res.status(500).json({
      error: "MC_API_KEY nao configurada no backend",
    })
  }

  const receivedApiKey = req.headers["x-api-key"]

  if (receivedApiKey !== expectedApiKey) {
    return res.status(401).json({
      error: "unauthorized",
    })
  }

  next()
}