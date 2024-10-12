const express = require("express");
const { getAllEmployees, createEmployee, getEmployeeById, updateEmployee, deleteEmployee } = require("../controllers/employee");
const route = express.Router();


route.get('/', getAllEmployees)
route.get('/:id', getEmployeeById)
route.post('/create', createEmployee)
route.put('/update/:id', updateEmployee)
route.delete('/delete/:id', deleteEmployee)



module.exports = route;