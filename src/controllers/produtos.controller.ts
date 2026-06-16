import type { Request, Response } from "express";
import { ProdutoService } from "../services/produtos.service.js";

const produtosService = new ProdutoService();

export class ProdutoController {
    async getAll (req: Request, res: Response) {
        try {
            const produtos = await produtosService.getAll();
            res.json(produtos);
        } catch (err) {
            res.status(500).json({ error: 'Erro ao buscar produtos'});
        }
    }

    async getById (req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const produto = await produtosService.getById(id);

            if (!produto) return res.status(404).json({ message: "Produtos não encontrado"});
            res.json(produto);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar produtos' });
        }
    }

    async create (req: Request, res: Response) {
        try {
            const { name, categoria, preco, descricao, status } = req.body;
            const produto = await produtosService.create( name, categoria, preco, descricao, status );
            res.status(201).json(produto);
        } catch (error) {
            res.status(400).json({ error: 'Erro ao cadastrar produto' });
        }
    }

    async update (req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { name, categoria, preco, descricao, status }= req.body;

            const produto = await produtosService.update(id,  name, categoria, preco, descricao, status );
            res.json(produto);
        } catch (err) {
            res.status(500).json({ error: 'Erro ao atualizar produtos' });
        }
    }

    async delete (req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await produtosService.delete(id);
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: 'Erro ao deletar produtos'}); 
        }
    }   

}
