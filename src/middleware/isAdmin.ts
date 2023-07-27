import { Request, Response, NextFunction } from "express";
import JWT, { JsonWebTokenError } from "jsonwebtoken";
import { User } from "../model/auth.model";

interface Payload {
    _id: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
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
        if (user?.role === 'ADMIN') {
            next();
        }else{
            res.status(400).json({
                success: false,
                message: 'Only admin authorised'
            })
        }
    } catch (error) {
        if(error instanceof JsonWebTokenError){
            res.status(400).json({
                success: false,
                message: 'Something went wrong',
                error: error.message
            })
        }
        if(error instanceof Error){
            res.status(400).json({
                success: false,
                message: 'failed',
                error: error.message
            })
        }
    }


}

