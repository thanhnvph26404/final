import dotenv from "dotenv";
import express, { Express } from "express";
import morgan from "morgan";
import cors from 'cors';

const app: Express = express();

dotenv.config();

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors())

export const viteNodeApp: Express = app;