const mongoose = require("mongoose")
const CounterSchema = require('../schemas/counter');

const EmployeeSchema = new mongoose.Schema({
    employee_id: Number,
    employee_name: String,
    department: String,
    sex: String,
    marital_status: String,
    salary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee_Salary',
    },
    address: String,
}, {
    timestamps: true,
});


EmployeeSchema.pre('save', async function(next) {
    var doc = this;
    const counter = await CounterSchema.findByIdAndUpdate({_id: 'employee_id_seq'}, {$inc: { seq: 1} }, {upsert: true});
    doc.employee_id = counter?.seq || 1;
    next();
});

module.exports = mongoose.model('employees', EmployeeSchema);

