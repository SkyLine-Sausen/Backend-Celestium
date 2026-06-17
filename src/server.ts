import express from "express";
import userRouter from "./routes/user.routes.js";

import authRouter from "./routes/auth.routes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(cors())

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/users", userRouter);

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});