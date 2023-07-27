import { NextFunction, Request, Response } from "express"
import { Employee } from "../model/employee.model";
import { EmployeeType } from "../types/Employee";
import { Mongoose, MongooseError } from "mongoose";
import { CustomError } from "../utils/CustomError";

interface CreateEmployeeBody {
    firstName: string;
    lastName?: string;
    email: string;
    department: string;
}

export const createEmployee = async (req: Request, res: Response) => {
    const { firstName, lastName, email, department }: CreateEmployeeBody = req.body;

    try {
        if(!firstName || !lastName || !email || !department){
            return res.status(406).json({
                message: 'All fields are required'
            })
        }
        const empAlreadyExist = (await Employee.findOne({ email })) as EmployeeType | null;
        if (empAlreadyExist) {
            return res.status(409).json({
                message: 'Employee already exists'
            });
        };
        const emp = (new Employee({
            firstName,
            lastName,
            email,
            department
        })) as EmployeeType;

        await emp.save();
        res.status(201).json({
            success: true,
            message: 'Employee created successfully',
            data: emp,
        });
    } catch (error) {
        CustomError(res, 400, 'Employee creation failed', error as MongooseError|Error)
    };

};

export const getEmployees = async (req: Request, res: Response) => {
    try {
        const allEmployees = (await Employee.find({})) as EmployeeType[] | null;
        res.status(200).json({
            success: true,
            message: 'Fetched all employees',
            data: allEmployees
        });
    } catch (error) {
        CustomError(res, 401, 'Failed to retrieve the users', error as MongooseError|Error)

    };
};

export const getEmployeeById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(401).json({
                success: false,
                message: 'Employee does not exist'
            })
        }
        const emp = (await Employee.findById(id)) as EmployeeType | null;
        res.status(200).json({
            success: true,
            message: 'Retrieved the employee',
            data: emp
        });
    } catch (error) {
        CustomError(res, 404, 'Not Found', error as MongooseError|Error)

    };
};

export const deleteEmployee = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(404).json({
                success: false,
                message: 'Employee does not exist'
            });
        };
        const deletedEmp = (await Employee.findByIdAndDelete(id)) as EmployeeType | null;
        res.status(200).json({
            success: true,
            message: 'Employee deleted',
            data: deletedEmp
        });
    } catch (error) {
        CustomError(res, 403, 'Failed to delete the employee', error as MongooseError|Error)

    }
}

export const updateEmployee = async (req: Request, res: Response) => {
    const data = req.body;
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        };
        const updatedEmployee = (await Employee.findByIdAndUpdate(id, { ...data }, { new: true })) as EmployeeType | null;
        res.status(200).json({
            success: true,
            message: 'Updated the employee',
            data: updatedEmployee
        });
    } catch (error) {
        CustomError(res, 403, 'Failed to update the employee', error as MongooseError|Error)
    }
}