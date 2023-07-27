import { Request, Response, NextFunction } from "express";
import JWT, { JsonWebTokenError } from "jsonwebtoken";
import { User } from "../model/auth.model";

interface Payload{
    _id: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
}

export const isAuthenticated = async (req:Request, res:Response, next:NextFunction)=>{
    let token;

    if (
        req.cookies.token ||
        (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        ) {
        token = req.cookies.token || req.headers?.authorization?.split(" ")[1]
    }

    if (!token) {
        return res.status(400).json({
            success: false,
            message: 'authentication failed'
        })
    }
    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET as string) as Payload;
        const user = await User.findById(payload._id);
        if(user){
            next();
        }else{
            return res.status(400).json({
                success: false,
                message: 'authentication failed'
            })
        }
    } catch (error) {
        if(error instanceof JsonWebTokenError){
            return res.status(400).json({
                success: false,
                message: 'Something went wrong',
                error: error.message
            })
        }
        if(error instanceof Error){
            return res.status(400).json({
                success: false,
                message: 'failed',
                error: error.message
            })
        }
    }


}

