import mongoose from "mongoose";
import { roles } from "../constants/roles";
import bcrypt from "bcryptjs";
import JWT from 'jsonwebtoken'

interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    role: string;
    comparePassword: (enteredPassword: string) => Promise<boolean>;
    getJWT: () => string;
  }

export const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(roles),
        default: roles.MEMBER,
    }

});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        return next(error as Error)
    }
})

userSchema.methods  = {
    // compare password
    comparePassword: async function (enteredPassword: string) {
        return await bcrypt.compare(enteredPassword, this.password)
    },

    // generate JWT
    getJWT: function () {
        const token = JWT.sign({
            _id: this._id,
            email: this.email,
            role: this.role
        }, process.env.JWT_SECRET as string,
            {
                expiresIn: process.env.JWT_EXPIRY
            })
        return token as string
    }
}



export const  User = mongoose.model<IUser>('User', userSchema)