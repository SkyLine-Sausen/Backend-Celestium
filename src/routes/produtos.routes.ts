import { Router } from "express";
import { ProdutoController } from "../controllers/produtos.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const produtosRouter = Router();
const produtosController = new ProdutoController();
produtosRouter.post("/", produtosController.create);

produtosRouter.put("/:id", authMiddleware, produtosController.update)
produtosRouter.use(authMiddleware)

produtosRouter.get("/", produtosController.getAll);
produtosRouter.get("/:id", produtosController.getById);
produtosRouter.post("/", produtosController.create);
produtosRouter.put("/:id", produtosController.update);
produtosRouter.delete("/:id", produtosController.delete);


export default produtosRouter;