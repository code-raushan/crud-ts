import { Request, Response } from "express"
import { User } from "../model/auth.model"
import { MongooseError } from "mongoose";

interface SignUpBody{
    fullName: string;
    email: string;
    password: string;
    role?: string;
}
interface CookieOptions{
    expires: Date;
    httpOnly: boolean;
}

export const cookieOptions: CookieOptions = {
    expires: new Date(Date.now() + 3*24*60*60*1000),
    httpOnly: true
}

/******************************************************
 * @SIGNUP
 * @route http://localhost:8005/api/signup
 * @description User signUp Controller for creating new user
 * @parameters fullName, email, password
 * @returns User Object
 ******************************************************/

export const signup = async (req:Request, res:Response)=>{
    const {fullName, email, password}: SignUpBody = req.body;

    try {
        if(!fullName || !email || !password){
            return res.status(401).json({
                message: 'All fields are required'
            })
        }
        const emailExists = await User.findOne({email});
        if(emailExists){
            return res.status(400).json({
                message: 'Account already exists'
            });
        }
        const user = new User({
            fullName,
            email,
            password
        });
        await user.save();

        const token = user.getJWT();
        res.cookie('token', token, cookieOptions)
        user.password = "";
        res.status(200).json({
            success: true,
            message: 'User signed up successfully',
            data: user,
        });
    } catch (error) {
        if (error instanceof MongooseError) {
            res.status(401).json({
                success: false,
                message: 'Employee creation failed',
                err: error.message
            });
        };
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed',
                err: error.message
            });
        };
    };
};
/******************************************************
 * @LOGIN
 * @route http://localhost:8005/api/login
 * @description User signIn Controller for loging new user
 * @parameters  email, password
 * @returns User Object
 ******************************************************/

export const login = async(req:Request, res:Response)=>{
    const {email, password}=req.body;
    try {
        if ( !email || !password) {
            return res.status(401).json({
                message: 'All fields are required'
            })
        };
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message: 'Invalid credentials'
            })
        };
        const isPasswordMatched = await user.comparePassword(password);
        if(isPasswordMatched){
            const token = user.getJWT();
            user.password = "";
            res.cookie('token', token, cookieOptions);

            return res.status(200).json({
                success: true,
                token,
                user
            })
        }else{
            return res.status(400).json({
                success: false,
                message: 'Invalid Credentials'
            })
        }
    } catch (error) {
        if (error instanceof MongooseError) {
            res.status(401).json({
                success: false,
                message: 'Login failed',
                err: error.message
            });
        };
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed',
                err: error.message
            });
        };
    };
};
/******************************************************
 * @LOGOUT
 * @route http://localhost:8005/api/logout
 * @description User logout by clearing user cookies
 * @parameters  
 * @returns success message
 ******************************************************/

export const logout = (req:Request, res:Response)=>{
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
};