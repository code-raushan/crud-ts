"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployee = exports.deleteEmployee = exports.getEmployeeById = exports.getEmployees = exports.createEmployee = void 0;
const employee_model_1 = require("../model/employee.model");
const CustomError_1 = require("../utils/CustomError");
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, department } = req.body;
    try {
        if (!firstName || !lastName || !email || !department) {
            return res.status(401).json({
                message: 'All fields are required'
            });
        }
        const empAlreadyExist = (yield employee_model_1.Employee.findOne({ email }));
        if (empAlreadyExist) {
            return res.status(400).json({
                message: 'Employee already exists'
            });
        }
        ;
        const emp = (new employee_model_1.Employee({
            firstName,
            lastName,
            email,
            department
        }));
        yield emp.save();
        res.json({
            success: true,
            message: 'Employee created successfully',
            data: emp,
        });
    }
    catch (error) {
        (0, CustomError_1.CustomError)(res, 401, 'Employee creation failed', error);
    }
    ;
});
exports.createEmployee = createEmployee;
const getEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allEmployees = (yield employee_model_1.Employee.find({}));
        res.status(200).json({
            success: true,
            message: 'Fetched all employees',
            data: allEmployees
        });
    }
    catch (error) {
        (0, CustomError_1.CustomError)(res, 401, 'Failed to retrieve the users', error);
    }
    ;
});
exports.getEmployees = getEmployees;
const getEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(401).json({
                success: false,
                message: 'Employee does not exist'
            });
        }
        const emp = (yield employee_model_1.Employee.findById(id));
        res.status(200).json({
            success: true,
            message: 'Retrieved the employee',
            data: emp
        });
    }
    catch (error) {
        (0, CustomError_1.CustomError)(res, 401, 'Failed to retrieve the employee by id', error);
    }
    ;
});
exports.getEmployeeById = getEmployeeById;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(401).json({
                success: false,
                message: 'Employee does not exist'
            });
        }
        ;
        const deletedEmp = (yield employee_model_1.Employee.findByIdAndDelete(id));
        res.status(200).json({
            success: true,
            message: 'Deleted the employee',
            data: deletedEmp
        });
    }
    catch (error) {
        (0, CustomError_1.CustomError)(res, 401, 'Failed to delete the employee', error);
    }
});
exports.deleteEmployee = deleteEmployee;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(401).json({
                success: false,
                message: 'Employee does not exist'
            });
        }
        ;
        const updatedEmployee = (yield employee_model_1.Employee.findByIdAndUpdate(id, Object.assign({}, data), { new: true }));
        res.status(200).json({
            success: true,
            message: 'Updated the employee',
            data: updatedEmployee
        });
    }
    catch (error) {
        (0, CustomError_1.CustomError)(res, 401, 'Failed to update the employee', error);
    }
});
exports.updateEmployee = updateEmployee;
