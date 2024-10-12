const EmployeeSchema = require('../schemas/employees');
const EmployeeSalarySchema = require('../schemas/employeeSalary');


exports.getAllEmployees = async (req, res) => {
    const data = await EmployeeSchema.aggregate(
        [
            {
                $lookup:
                {
                    from: "employee_salaries",
                    localField: "salary",
                    foreignField: "_id",
                    as: "salary_details",
                },
            },
        ]
    )

    let _data = data.map(e => ({ ...e, salaryId: e.salary, salary: e.salary_details[0]?.salary || null }))

    return res.json({ message: "ok", data: _data })
}

exports.getEmployeeById = async (req, res) => {
    const params = req.params;
    const employeeData = await EmployeeSchema.findOne({ employee_id: params.id }).lean();
    console.log(employeeData)
    if(employeeData){
        const employeeSalary = await EmployeeSalarySchema.findById(employeeData.salary);
        employeeData.salary = employeeSalary?.salary || null;
    }

    return res.json({ message: "ok", data: employeeData })
}


exports.createEmployee = async (req, res) => {
    console.log(req.body)
    const { empName, empId, department, sex, maritalStatus, salary, address } = req.body;

    const salarySchema = EmployeeSalarySchema({ salary });
    const salaryRecord = await salarySchema.save();

    const data = {
        employee_id: empId,
        employee_name: empName,
        department,
        sex,
        marital_status: maritalStatus,
        salary: salaryRecord._id, // foreign key
        address,
    }
    const schema = new EmployeeSchema(data)
    const record = await schema.save()
    console.log(record);

    return res.json({ message: "ok" });
}

exports.updateEmployee = async (req, res) => {
    const params = req.params;
    console.log(req.body)
    const { empName, department, sex, maritalStatus, salary, address } = req.body;

    const data = {
        employee_name: empName,
        department,
        sex,
        marital_status: maritalStatus,
        address,
    }
    const record = await EmployeeSchema.findOneAndUpdate({ employee_id: params.id }, data)

    const salaryRecord = await EmployeeSalarySchema.findOneAndUpdate({ _id: record.salary }, {
        salary
    });

    console.log(record);
    console.log(salaryRecord)

    return res.json({ message: "ok" });
}

exports.deleteEmployee = async (req, res) => {
    const params = req.params;
    
    const record = await EmployeeSchema.findOneAndDelete({ employee_id: params.id });

    const salaryRecord = await EmployeeSalarySchema.findByIdAndDelete(record.salary)
    console.log(record);
    console.log(salaryRecord);

    return res.json({ message: "ok" });
}