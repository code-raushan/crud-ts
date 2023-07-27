import { Request, Response } from "express"
import { Employee } from "../model/employee.model";
import { EmployeeType } from "../types/Employee";
import { MongooseError } from "mongoose";

interface CreateEmployeeBody {
    firstName: string;
    lastName?: string;
    email: string;
    department: string;
}



export const create = async (req: Request, res: Response) => {
    const { firstName, lastName, email, department }: CreateEmployeeBody = req.body;

    try {
        const empAlreadyExist = await Employee.findOne({ email });
        if (empAlreadyExist) {
            return res.status(400).json({
                message: 'Employee Already Exist'
            });
        };
        const emp = (new Employee({
            firstName,
            lastName,
            email,
            department
        })) as EmployeeType;

        await emp.save();
        res.json({
            success: true,
            emp,
        });
    } catch (error) {

        if(error instanceof MongooseError){
            res.status(401).json({
                success: false,
                message: 'Employee creation failed',
                err: error.message
            });
        };
        if(error instanceof Error){
            res.status(500).json({
                success: false,
                message: 'Failed',
                err: error.message
            });
        };
    };

};
export const getEmployees = async (req:Request, res:Response)=>{
    try {
        const allEmployees = (await Employee.find({})) as EmployeeType[];
        res.status(200).json({
            success: true,
            message: 'Fetched all employees',
            allEmployees
        });
    } catch (error) {
        if(error instanceof MongooseError){
            res.status(401).json({
                success: false,
                message: 'Retrieval failed',
                err: error.message
            });
        }
        if(error instanceof Error){
            res.status(500).json({
                success: false,
                message: 'Failed',
                err: error.message
            });
        };
    };
};
export const getEmployeeById = async (req:Request, res:Response) => {
    const {id} = req.params;
    if(!id){
        return res.status(401).json({
            success: false,
            message: 'Employee does not exist'
        })
    }
    try {
        const emp = (await Employee.findById(id)) as EmployeeType;
        res.status(200).json({
            success: true,
            message: 'Retrieved the employee',
            emp
        });
    } catch (error) {
        if(error instanceof MongooseError){
            res.status(401).json({
                success: false,
                message: 'Retrieval failed',
                err: error.message
            });
        }
        if(error instanceof Error){
            res.status(500).json({
                success: false,
                message: 'Failed',
                err: error.message
            });
        };
    }
}
