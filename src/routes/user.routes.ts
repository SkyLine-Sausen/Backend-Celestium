import { Router } from "express"
import { UserController } from "../controllers/user.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { allowRoles } from "../middleware/role.middleware.js"

const userRouter = Router()
const userController = new UserController()

userRouter.post("/", userController.create)

// PRECISA esta com autenticação - Está sem para uso didático
userRouter.get("/", userController.getAll)

// middleware em uma rota específica
userRouter.put("/:id", authMiddleware, userController.update)

// TODAS as rotas abaixo deste ponto estarão protegidas
userRouter.use(authMiddleware)

userRouter.get("/:id", userController.getById)
userRouter.delete("/:id", allowRoles("ADMIN"), userController.delete)

export default userRouter
