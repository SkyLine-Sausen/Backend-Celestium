import { prisma } from "../lb/prisma.js";

export class ProdutoService {
    async getAll(){
        return prisma.produtos.findMany({orderBy: { id: "asc" }});
    }

    async getById(id: number){
        return prisma.produtos.findUnique({ 
            where: {id} 
        });
    }

    async create(name: string, categoria: string, preco: number, descricao: string, status: boolean){
    return await prisma.produtos.create({ 
      data: { name, categoria, preco, descricao, status }
    });
  }

    async findByName(name: string) {
        return await prisma.produtos.findMany({
        where: { name }
        });
    }

    async findByCategoria(categoria: string) {
        return await prisma.produtos.findMany({
        where: { categoria }
        });
    }

    async update(id: number, name: string, categoria: string, preco: number, descricao: string, status: boolean){
        return prisma.produtos.update({
             where: {id}, data: {name, categoria, preco, descricao, status}
            });
    }

    async delete(id: number){
        return prisma.produtos.delete({
             where: {id} 
            });
    }
}
