import { NextFunction, Request, Response } from "express"
import { Employee } from "../model/employee.model";
import { EmployeeType } from "../types/Employee";
import { MongooseError } from "mongoose";


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
            return res.status(401).json({
                message: 'All fields are required'
            })
        }

        const empAlreadyExist = (await Employee.findOne({ email })) as EmployeeType | null;
        if (empAlreadyExist) {
            return res.status(400).json({
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
        res.json({
            success: true,
            message: 'Employee created successfully',
            data: emp,
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

export const getEmployees = async (req: Request, res: Response) => {
    try {
        const allEmployees = (await Employee.find({})) as EmployeeType[] | null;
        res.status(200).json({
            success: true,
            message: 'Fetched all employees',
            data: allEmployees
        });
    } catch (error) {
        if (error instanceof MongooseError) {
            res.status(401).json({
                success: false,
                message: 'Retrieval failed',
                err: error.message
            });
        }
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed',
                err: error.message
            });
        };
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
        if (error instanceof MongooseError) {
            res.status(401).json({
                success: false,
                message: 'Retrieval failed',
                err: error.message
            });
        }
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed',
                err: error.message
            });
        };
    };
};

export const deleteEmployee = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(401).json({
                success: false,
                message: 'Employee does not exist'
            });
        };
        const deletedEmp = (await Employee.findByIdAndDelete(id)) as EmployeeType | null;
        res.status(200).json({
            success: true,
            message: 'Deleted the employee',
            data: deletedEmp
        });
    } catch (error) {
        if (error instanceof MongooseError) {
            res.status(401).json({
                success: false,
                message: 'Deletion failed',
                err: error.message
            });
        }
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed',
                err: error.message
            });
        };
    }
}

export const updateEmployee = async (req: Request, res: Response) => {
    const data = req.body;
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(401).json({
                success: false,
                message: 'Employee does not exist'
            });
        };
        const updatedEmployee = (await Employee.findByIdAndUpdate(id, { ...data }, { new: true })) as EmployeeType | null;
        res.status(200).json({
            success: true,
            message: 'Updated the employee',
            data: updatedEmployee
        });
    } catch (error) {
        if (error instanceof MongooseError) {
            res.status(401).json({
                success: false,
                message: 'Updation failed',
                err: error.message
            });
        }
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed',
                err: error.message
            });
        };
    }

}