import type { Request, Response } from "express"
import { basicValidationRegister, sanitizeEmail } from "../lib/validateInputs.js"
import { UserService } from "../services/user.service.js"

const userService = new UserService()

export class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const users = await userService.findAll()
      return res.json(users)
    } catch (err) {
      res.status(err.status).json({ error: err.message })
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const user = await userService.findById(id)

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" })
      }
      return res.json(user)
    } catch (err) {
      res.status(err.status).json({ error: err.message })
      console.log(err)
    }
  }

  // Criar usuário
  async create(req: Request, res: Response) {
    try {
      // const { nickname, email, password } = req.body
      const nickname = req.body.nickname?.trim() || null
      const email = sanitizeEmail(req.body.email)
      const password = String(req.body.password || "")
      const role = String(req.body.role || "CUSTOMER")

      const validationError = basicValidationRegister(email, password)

      if (validationError) {
        return res.status(400).json({ error: validationError })
      }

      const user = await userService.create({ nickname, email, password, role })

      res.status(201).json(user)
    } catch (err) {
      res.status(err.status || 400).json({ error: err.message })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const { nickname, password, role } = req.body

      const user = await userService.update(id, { nickname, password, role })

      // Remove o campo password do objeto retornado
      const { password: _, ...userWithoutPassword } = user

      return res.json(userWithoutPassword)
    } catch (err) {
      // console.log(err)
      return res.status(500).json({ error: "Erro ao atualizar usuário" })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      await userService.delete(id)

      return res.status(204).send()
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: "Erro ao remover usuário" })
    }
  }
}
