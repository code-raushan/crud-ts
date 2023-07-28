import express, { Router } from 'express';
import { createEmployee, deleteEmployee, getEmployeeById, getEmployees, updateEmployee } from '../controller/employee.controllers';
import { login, logout, signup } from '../controller/auth.controller';
const router:Router = express.Router();

// Auth Routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout)

// Employee Routes

/**
   * @openapi
   * /api/employees:
   *  get:
   *     tags:
   *     - Get all employees
   *     description: Fetches all the employees
   *     responses:
   *       200:
   *         description: All employees fetched
   */

router.get('/employees', getEmployees);

  /**
   * @openapi
   * '/api/create':
   *  post:
   *     tags:
   *     - Create an employee
   *     summary: Register an employee
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              type: object
   *              properties: 
   *               firstName:
   *                type: string
   *               lastName:
   *                type: string
   *               email:
   *                type: string
   *               department: 
   *                type: string
   *           example:
   *               firstName: Raushan
   *               lastName: Kumar
   *               email: raushan@email.com
   *               department: IT
   *     responses:
   *      201:
   *        description: Created Successfully
   *      409:
   *        description: Employee already exists
   *      400:
   *        description: Employee creation failed
   *      406:
   *        description: All fields are required
   */

router.post('/create', createEmployee);

 /**
   * @openapi
   * '/api/employees/{id}':
   *  get:
   *     tags:
   *     - Get employee by ID
   *     summary: Get a single employee by the id
   *     parameters:
   *      - name: id
   *        in: path
   *        description: The id of the employee
   *        required: true
   *     responses:
   *       200:
   *         description: Retrieved the employee successfully
   *         content:
   *          application/json:
   *           schema:
   *              id:
   *               type: string
   *       404:
   *         description: Not found
   *  patch:
   *     tags:
   *     - Updating employee
   *     summary: Update an employee detail
   *     parameters:
   *      - name: id
   *        in: path
   *        description: The id of the employee
   *        required: true
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              type: object
   *              properties: 
   *               firstName:
   *                type: string
   *               lastName:
   *                type: string
   *               email:
   *                type: string
   *               department: 
   *                type: string
   *           example:
   *               firstName: Raushan 
   *               lastName: Kumar
   *               email: raushan@email.com
   *               department: IT 
   *     responses:
   *       200:
   *         description: Updated the employee
   *         content:
   *          application/json:
   *           schema:
   *              type: object
   *              properties: 
   *               firstName:
   *                type: string
   *               lastName:
   *                type: string
   *               email:
   *                type: string
   *               department: 
   *                type: string
   *           example:
   *               firstName: Raushan 
   *               lastName: Kumar
   *               email: raushan@email.com
   *               department: IT 
   *       403:
   *         description: Failed to update the employee
   *       404:
   *         description: Employee not found
   *  delete:
   *     tags:
   *     - Delete an employee
   *     summary: Delete an employee by its id.
   *     parameters:
   *      - name: id
   *        in: path
   *        description: The id of the employee
   *        required: true
   *     responses:
   *       200:
   *         description: Employee deleted
   *       403:
   *         description: Failed to delete the employee
   *       404:
   *         description: Employee does not exist
   */

router.get('/employees/:id', getEmployeeById);
router.delete('/employees/:id', deleteEmployee);
router.patch('/employees/:id', updateEmployee);

export default router;