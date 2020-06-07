import express from "express";
import config from "dotenv"
import userRouter from "./routers/user";

config.config();
import('./db/db')

const app = express()

app.use(express.json())
app.use(userRouter)

export default app;