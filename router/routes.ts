import express from 'express';
import { createEmployee, deleteEmployee, getEmployeeById, getEmployees, updateEmployee } from '../controller/employee.controllers';
import { login, logout, signup } from '../controller/auth.controller';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { isAdmin } from '../middleware/isAdmin';
const router = express.Router();

// Auth Routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout)

// Employee Routes
router.post('/create', createEmployee);
router.get('/employees', getEmployees);
router.get('/employees/:id', getEmployeeById);
router.delete('/employees/:id', deleteEmployee);
router.patch('/employees/:id', updateEmployee);

export default router;