import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
    },
    lastName: {
        type: String,
        minLength: 2
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    department: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
    }
);
export const Employee = mongoose.model("Employee", employeeSchema)