import dotenv from 'dotenv'
dotenv.config();
import express, { Express, Request, Response } from "express";
import connectToDb from "./config/db";
import router from './router/employee.router';
import morgan from "morgan";

const app = express();
connectToDb();

app.use(express.json());
app.use(morgan('tiny'));


app.get('/', (req:Request, res:Response)=>{
    res.send('Welcome to the Server');
});
app.use('/api', router);

// app.post('/post', async(req:Request,res:Response)=>{
//     const emp1 = await new Employee({
//         firstName: 'Raushan',
//         lastName: 'Kumar',
//         email: 'raushan@gmail.com',
//         department: 'Tech'
//     });
//     await emp1.save();
//     res.status(200).json({
//         success: true,
//         message: "Employee created",
//         emp1
//     })
// })

export default app;

