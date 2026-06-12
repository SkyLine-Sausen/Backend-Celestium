import { prisma } from "../lb/prisma.js";
import bcrypt from "bcrypt"

export class UserService {
    async getAll(){
        return prisma.user.findMany({orderBy: { id: "asc" }});
    }

    async getById(id: number){
        return prisma.user.findUnique({ 
            where: {id} 
        });
    }

    async create(name: string, email: string, password: string){
    const passwordHash = await bcrypt.hash(password, 10);
    return await prisma.user.create({ 
      data: { name, email, password: passwordHash }
    });
  }

    async findByEmail(email: string) {
        return await prisma.user.findUnique({
        where: { email }
        });
    }

    async update(id: number, name: string, email: string, password: string){
        return prisma.user.update({
             where: {id}, data: {name, email, password}
            });
    }

    async delete(id: number){
        return prisma.user.delete({
             where: {id} 
            });
    }
}
