import { Document, Types } from "mongoose";

interface EmployeeType extends Document{
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
}