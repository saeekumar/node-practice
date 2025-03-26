const express = require('express');
const { createEmployee, updateEmployee, getEmployeeById, getAllEmployees, getAllEmployeesCount } = require('./employee.controller');
const router = express.Router();


router.post('/', createEmployee);
router.put('/', updateEmployee);
router.get('/count', getAllEmployeesCount);
router.get('/:id', getEmployeeById);
router.get('/:limit/:page', getAllEmployees);



module.exports=router