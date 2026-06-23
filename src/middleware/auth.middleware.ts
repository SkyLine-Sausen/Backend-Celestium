import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { UserService } from "../services/user.service.js"
import type { NextFunction, Request, Response } from "express"

dotenv.config()

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.headers["authorization"])
  const token = req.header("Authorization")?.replace("Bearer ", "")

  if (!token) return res.status(403).send("No token provided.")

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    // console.log(decoded)
    req.user = decoded.sub // Adiciona os dados do usuário à requisição
    const userService = new UserService()
    const user = await userService.findById(req.user)
    // console.log(user)
    req.role = user!.role
    // console.log(req.user)
    // console.log(req.role)
    // console.log(req.body)
    next()
  } catch (err) {
    res.status(401).send("Invalid token.")
  }
}
