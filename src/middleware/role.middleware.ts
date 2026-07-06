import type { NextFunction, Request, Response } from "express"

export function allowRoles(...roles) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("teste:", req.role)
    // req.user foi definido no middleware auth
    const userRole = req.role
    console.log(req.user)
    if (!roles.includes(userRole)) {
      return res.status(403).json({
        error: "Acesso negado para este perfil",
      })
    }

    next()
  }
}