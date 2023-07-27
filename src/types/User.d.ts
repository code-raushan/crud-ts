import { Document, Schema, Types } from "mongoose";

import { User, userSchema } from "../model/auth.model";

interface UserType extends Document {
    _id: Types.ObjectId;
    fullName: string;
    email: string;
    password: string;
    role: string;
}
