import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import EmployeeCreateForm from './pages/EmployeeCreateForm';
import EmployeeGrid from './pages/EmployeeGrid';
import EmployeeUpdateForm from './pages/EmployeeUpdateForm';


const router = createBrowserRouter([
  {
    path: "/",
    element: <EmployeeCreateForm />,
  },
  {
    path: "/update/:empId",
    element: <EmployeeUpdateForm />,
  },
  {
    path: "/employees",
    element: <EmployeeGrid />,
  },
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
