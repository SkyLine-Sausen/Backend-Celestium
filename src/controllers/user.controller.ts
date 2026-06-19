import type { Request, Response } from "express";
import { UserService } from "../services/user.service.js";

const userService = new UserService();

export class UserController {
    async getAll (req: Request, res: Response) {
        try {
            const users = await userService.getAll();
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: 'Erro ao buscar usuários'});
        }
    }

    async getById (req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const user = await userService.getById(id);

            if (!user) return res.status(404).json({ message: "Usuários não encontrado"});
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
    }

    async create (req: Request, res: Response) {
        try {
            const { nickname, email, password } = req.body;
            const user = await userService.create( nickname, email, password );
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: 'Erro ao cadastrar usuário' });
        }
    }

    async update (req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { nickname, email, password }= req.body;

            const user = await userService.update(id,  nickname, email, password );
            res.json(user);
        } catch (err) {
            res.status(500).json({ error: 'Erro ao atualizar usuários' });
        }
    }

    async delete (req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await userService.delete(id);
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: 'Erro ao deletar usuários'}); 
        }
    }   

}
