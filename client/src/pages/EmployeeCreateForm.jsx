import { useState } from "react"
import axios from "axios";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

const SERVER_URL = 'http://localhost:8000';

function EmployeeCreateForm() {
    const navigate = useNavigate();

    const initialState = {
        empName: "",
        empId: "",
        department: "",
        sex: "",
        maritalStatus: "",
        salary: "",
        address: "",
    }

    const [form, setForm] = useState(initialState);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(form)
            // async , sync
            const res = await axios({
                url: SERVER_URL + '/api/employee/create',
                method: "POST",
                data: form
            })
            console.log(res.data, res.status);
            navigate('/employees');
            window.alert('New Employee details are created successfully!')

            console.log('server executed')
        } catch (error) {
            console.log(error)
        }
    }

    return (<Form initialState={initialState} form={form} setForm={setForm} handleSubmit={handleSubmit} />)
}


export default EmployeeCreateForm