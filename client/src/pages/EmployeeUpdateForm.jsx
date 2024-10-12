import { useEffect, useState } from "react"
import axios from "axios";
import Form from "../components/Form";
import { useParams, useNavigate } from "react-router-dom";

const SERVER_URL = 'http://localhost:8000';

function EmployeeUpdateForm() {
    let { empId } = useParams();
    const navigate = useNavigate();

    const initialState = {
        empName: "",
        empId: "",
        department: "",
        sex: "",
        maritalStatus: "",
        salary: "",
        address: "",
    };

    const [form, setForm] = useState(initialState);


    const fetchEmployeeById = async (id) => {
        try {
            const res = await axios({
                url: SERVER_URL + '/api/employee/' + id,
                method: "GET",
            })
            console.log(res.data.data);
            if(res.data.data){
                let data = res.data.data
                let updateData = {
                    empName: data.employee_name,
                    empId: data.employee_id,
                    department: data.department,
                    sex: data.sex,
                    maritalStatus: data.marital_status,
                    salary: data.salary || '',
                    address: data.address,
                }
                setForm(updateData)
            }
            console.log('server executed')
        } catch (error) {
            console.log(error)
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(form)
            // async , sync
            const res = await axios({
                url: SERVER_URL + '/api/employee/update/' + empId,
                method: "PUT",
                data: form
            })
            console.log(res.data, res.status);
            navigate('/employees');
            console.log('server executed')
            window.alert('Employee details are updated successfully!')

        } catch (error) {
            console.log(error)
            window.alert('OOPS! Something went wrong')
        }
    }

    useEffect(() => {
        console.log(empId)
        fetchEmployeeById(empId)
    }, [])

    return (<Form id={empId} initialState={initialState} form={form} setForm={setForm} handleSubmit={handleSubmit} />)
}


export default EmployeeUpdateForm