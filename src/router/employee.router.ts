import express from 'express';
import { create, deleteEmployee, getEmployeeById, getEmployees, updateEmployee } from '../controller/employee.controllers';
const router = express.Router();

router.post('/create', create);
router.get('/employees', getEmployees);
router.get('/employees/:id', getEmployeeById);
router.delete('/employees/:id', deleteEmployee);
router.patch('/employees/:id', updateEmployee);

export default router;