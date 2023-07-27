import express from 'express';
import { create, getEmployeeById, getEmployees } from '../controller/employee.controllers';
const router = express.Router();

router.post('/create', create);
router.get('/employees', getEmployees);
router.get('/employees/:id', getEmployeeById);
router.delete('/employees/:id', ()=>{});
router.patch('/employees/:id', ()=>{});

export default router;