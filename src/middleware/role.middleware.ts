import type { NextFunction, Request, Response } from "express"

export function allowRoles(...roles) {
  return (req: Request, res: Response, next: NextFunction) => {
    // req.user foi definido no middleware auth
    const userRole = req.user.role

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        error: "Acesso negado para este perfil",
      })
    }

    next()
  }
}