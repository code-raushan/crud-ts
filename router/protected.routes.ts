import express from 'express';
import { createEmployee, deleteEmployee, getEmployeeById, getEmployees, updateEmployee } from '../controller/employee.controllers';
import { login, logout, signup } from '../controller/auth.controller';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { isAdmin } from '../middleware/isAdmin';
const router = express.Router();

/*
Protected Routes: Role Based Authorisation
*/

// Auth Routes


router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

// Employee Routes
router.post('/create', isAdmin, createEmployee);
router.get('/employees', getEmployees);
router.get('/employees/:id', isAuthenticated, getEmployeeById);
router.delete('/employees/:id', isAdmin, deleteEmployee);
router.patch('/employees/:id', isAuthenticated, updateEmployee);

export default router;