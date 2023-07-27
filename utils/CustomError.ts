import { Response } from "express"
import { JsonWebTokenError } from "jsonwebtoken"
import { MongooseError } from "mongoose"
export const CustomError = (res:Response, statusCode:number, message:string, error:Error | MongooseError | JsonWebTokenError)=>{
    if(error instanceof Error){
        res.status(statusCode).json({
            message,
            error: error.message
        })
    }
    if(error instanceof JsonWebTokenError){
        res.status(statusCode).json({
            message,
            error: error.message
        })
    }
    if(error instanceof MongooseError){
        res.status(statusCode).json({
            message,
            error: error.message
        })
    }
}