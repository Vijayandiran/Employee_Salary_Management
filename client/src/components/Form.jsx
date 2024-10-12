import { useState } from "react"
import axios from "axios";
import "./employee_form.css"
import { useNavigate } from "react-router-dom";

const SERVER_URL = 'http://localhost:8000';

function Form({ id, initialState, form, setForm, handleSubmit }) {
    const navigate = useNavigate();

    const handleChange = (event) => {
        console.log(event.target.value);
        const { name, value } = event.target;
        const cloneForm = { ...form } // spead operator

        cloneForm[name] = value
        setForm(cloneForm);
    }

    return (<div className="emp-form-container">
        <h2 className='emp-form--title'>Employee Salary Management</h2>
        <form className="emp-form" id="employeeForm" onSubmit={handleSubmit}>
            {id ? (
                <>
                    <label htmlFor="empId">Employee ID:</label>
                    <input type="text" name="empId" id="empId" required value={form.empId} onChange={handleChange} readOnly />
                </>
            )
                : null}

            <label htmlFor="empName">Employee Name:</label>
            <input type="text" name="empName" id="empName" required value={form.empName} onChange={handleChange} />
            
            <label htmlFor="department">Department:</label>
            <select name="department" id="department" required value={form.department} onChange={handleChange} >
                <option value="">Select Department</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="IT">IT</option>
            </select>

            <label>Sex:</label>
            <div className="radio-group">
                <input type="radio" name="sex" id="male" value="Male" required checked={form.sex === "Male"} onChange={handleChange} />
                <label htmlFor="male">Male</label>
                <input type="radio" name="sex" id="female" value="Female" checked={form.sex === "Female"} onChange={handleChange} />
                <label htmlFor="female">Female</label>
            </div>

            <label>Marital Status:</label>
            <div className="radio-group">
                <input type="radio" name="maritalStatus" id="single" value="Single" required checked={form.maritalStatus === "Single"} onChange={handleChange} />
                <label htmlFor="single">Single</label>
                <input type="radio" name="maritalStatus" id="married" value="Married" checked={form.maritalStatus === "Married"} onChange={handleChange} />
                <label htmlFor="married">Married</label>
            </div>

            <label htmlFor="salary">Salary:</label>
            <input type="number" id="salary" name="salary" required min="0" placeholder="Enter salary" value={form.salary} onChange={handleChange} />

            <label htmlFor="address">Address:</label>
            <textarea id="address" name="address" required placeholder="Enter address" value={form.address} onChange={handleChange}></textarea>

            <button type="submit">{id ? 'Update' : 'Submit'}</button>
            <button type="button" onClick={
                () => navigate('/employees')
            }>View</button>
            <button type="button" onClick={
                () => {
                    if (id) {
                        navigate('/employees')
                    } else {
                        setForm(initialState)
                    }
                }
            }>{id ? 'Cancel' : 'Clear'}</button>
        </form>
    </div>)
}


export default Form