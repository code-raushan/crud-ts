import dotenv from 'dotenv'
dotenv.config();
import express, { Express, Request, Response } from "express";
import connectToDb from "./config/db";
import protectedRoutes from './router/protected.routes';
import routes from './router/routes';
import morgan from "morgan";
import cookieParser from 'cookie-parser';

const app:Express = express();

connectToDb();

app.use(cookieParser())
app.use(express.json());
app.use(morgan('tiny'));


app.get('/', (req:Request, res:Response)=>{
    res.send('Welcome to the Server');
});
app.use('/api', routes )
//protected routes
app.use('/api/auth', protectedRoutes);


export default app;

