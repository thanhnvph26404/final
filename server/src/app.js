import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from 'cors';
import connectDB from "./config/database";
import ProductRouter from "./routes/products";
import authRouter from "./routes/auth";
import voucherRouter from "./routes/voucher";
import passwordRouter from "./routes/password";
import categoryRouter from "./routes/categories";
import uploadRouter from "./routes/upload";
import contactRouter from "./routes/contact";

const app = express();

dotenv.config();

// connect db
connectDB( process.env.MONGO_URI )

app.use( express.json() );
app.use( morgan( "tiny" ) );
app.use( cors() )
app.use( '/auth', authRouter )
app.use( '/password', passwordRouter )
app.use( '/category', categoryRouter )
app.use( '/images', uploadRouter )
app.use( "/voucher", voucherRouter );
app.use( "/products", ProductRouter );
app.use( "/contact", contactRouter );



export const viteNodeApp = app;
// 