import express from "express"
import cors from "cors"

import userRouter from "./routes/user.routes.js"
import authRouter from "./routes/auth.routes.js"
import productsRouter from "./routes/products.routes.js"
import categoriesRouter from "./routes/categories.routes.js"
import ordersRouter from "./routes/orders.routes.js"
import statusRouter from "./routes/status.routes.js"
import deliveriesRouter from "./routes/deliveries.routes.js"

const app = express()
const PORT = process.env.PORT || 3005

app.use(express.json())
app.use(cors())

app.get("/health", (req, res) => {
  res.json({ status: "OK" })
})

app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/products", productsRouter)
app.use("/categories", categoriesRouter)
app.use("/orders", ordersRouter)
app.use("/status", statusRouter)

// Rotas que o plugin do Minecraft vai chamar
app.use("/api/deliveries", deliveriesRouter)

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`)
})