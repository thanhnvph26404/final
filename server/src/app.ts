import dotenv from "dotenv";
import express, { Express } from "express";
import morgan from "morgan";
import cors from 'cors';
import connectDB from "./config/database";
const app: Express = express();

dotenv.config();

// connect db
connectDB(process.env.MONGO_URI as string)

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors())

export const viteNodeApp: Express = app;