import type { Request, Response } from "express";
import { UserService } from "../services/user.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userService = new UserService();

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await userService.findByEmail(email);
      if (!user) {
         return res.status(401).json({ error: "Email ou senha incorretos" });
      }
      
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
         return res.status(401).json({ error: "Email ou senha incorretos" });
      }
      console.log(req.body)
      const secret = process.env.JWT_SECRET as string;
      console.log(secret)
      const token = jwt.sign({ sub: user.id }, secret, { expiresIn: "24h" });

      
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Erro ao fazer login" });
    }
  }
}