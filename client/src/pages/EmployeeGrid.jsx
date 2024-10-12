import { useEffect, useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { BsFillPersonPlusFill } from "react-icons/bs";
import axios from 'axios';

import "./employee_grid.css"
import { useNavigate } from "react-router-dom";

const SERVER_URL = 'http://localhost:8000';

// //nested data is ok, see accessorKeys in ColumnDef below
// const data = [
//   {
//     name: {
//       firstName: 'John',
//       lastName: 'Doe',
//     },
//     address: '261 Erdman Ford',
//     city: 'East Daphne',
//     state: 'Kentucky',
//   },
//   {
//     name: {
//       firstName: 'Jane',
//       lastName: 'Doe',
//     },
//     address: '769 Dominic Grove',
//     city: 'Columbus',
//     state: 'Ohio',
//   },
//   {
//     name: {
//       firstName: 'Joe',
//       lastName: 'Doe',
//     },
//     address: '566 Brakus Inlet',
//     city: 'South Linda',
//     state: 'West Virginia',
//   },
//   {
//     name: {
//       firstName: 'Kevin',
//       lastName: 'Vandy',
//     },
//     address: '722 Emie Stream',
//     city: 'Lincoln',
//     state: 'Nebraska',
//   },
//   {
//     name: {
//       firstName: 'Joshua',
//       lastName: 'Rolluffs',
//     },
//     address: '32188 Larkin Turnpike',
//     city: 'Omaha',
//     state: 'Nebraska',
//   },
// ];

const EmployeeGrid = () => {
    const [employeeData, setEmployeeData] = useState([]);
    const navigate = useNavigate();

    const fetchEmployees = async () => {
        try {

            const res = await axios({
                url: SERVER_URL + '/api/employee',
                method: "GET",
            })
            console.log(res.data.data);
            setEmployeeData(res.data.data)
            console.log('server executed')
        } catch (error) {
            console.log(error)
        }
    }

    const handleCreate = () => {
        navigate('/')
    }

    const handleUpdate = (row) => {
        console.log('update', row.original)
        let id = row.original.employee_id;
        navigate('/update/' + id)
    }

    const handleDelete = async (row) => {
        console.log('delete', row.original)

        let id = row.original.employee_id;
        if (window.confirm("Are you sure you want to delete this employee record ?") === true) {
            try {
                const res = await axios({
                    url: SERVER_URL + '/api/employee/delete/' + id,
                    method: "DELETE",
                })
                console.log(res.data, res.status);
                window.location.reload();
                console.log('server executed')
            } catch (error) {
                console.log(error)
            }

        }

    }

    useEffect(() => {
        console.log('hello')
        fetchEmployees()

    }, [])

    //should be memoized or stable
    const columns = useMemo(
        () => [
            {
                accessorKey: 'employee_id', //access nested data with dot notation
                header: 'Employee ID',
                size: 150,
            },
            {
                accessorKey: 'employee_name',
                header: 'Employee Name',
                size: 150,
            },
            {
                accessorKey: 'department',
                header: 'Department',
                size: 150,
            },
            {
                accessorKey: 'marital_status',
                header: 'Marital Status',
                size: 150,
            },
            {
                accessorKey: 'sex',
                header: 'Sex',
                size: 150,
            },
            {
                accessorKey: 'salary',
                header: 'Salary',
                size: 150,
            },
            {
                accessorKey: 'address', //normal accessorKey
                header: 'Address',
                size: 200,
            },
            // {
            //     accessorKey: 'employee_id', //normal accessorKey
            //     header: 'Action',
            //     size: 200,
            //     Cell: ({ cell }) => {
            //         // console.log('data', cell.getValue())
            //         return (<div className='action-btn-group'>
            //             <button className='action-btn-update' onClick={() => handleUpdate(cell.getValue())}>Update</button>
            //             <button className='action-btn-delete' onClick={() => handleDelete(cell.getValue())}>Delete</button>
            //         </div>);
            //     },
            // },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data: employeeData, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableRowActions: true,
        positionActionsColumn: 'last',
        renderRowActions: ({ row, table }) => (
            <div className='action-btn-group' >
                <button className='action-btn-update' onClick={() => handleUpdate(row)}>Update</button>
                <button className='action-btn-delete' onClick={() => handleDelete(row)}>Delete</button>
            </div >
        )
    });

    return <div className='grid-container'>
        <div className='grid-header'>
            <h2>Employee Table</h2>
            <button className='action-btn-create' onClick={handleCreate}>
                <BsFillPersonPlusFill /> Create
            </button>
        </div>
        <MaterialReactTable table={table} />
    </div>;
};

export default EmployeeGrid;
