const mongoose = require("mongoose")

const EmployeeSalarySchema = new mongoose.Schema({
    salary: Number
}, {
    timestamps: true,
});

module.exports = mongoose.model('employee_salary', EmployeeSalarySchema);