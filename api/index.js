require('dotenv').config();
const express = require("express");
const cors = require("cors");

const employeeRoutes = require("./routes/employee.route");
const db = require("./db")

const app = express();
const PORT = 8000;

// MVC -> Module View Controller


app.use(cors());
app.use(express.json());

app.use('/api/employee', employeeRoutes)

// /api/employee

// /api/employee/create

// app.get('/:id', (req, res) => {
//     console.log(req.params)
//     console.log(req.query)
//     console.log(req.headers)

//     return res.json({message: "ok"});
// })

// app.post('/create', (req, res) => {
//     console.log(req.body)
//     return res.json({message: "ok"});
// })

app.listen(PORT, (error) => {
    if(error){
        console.log(error)
    }

    console.log(`Server is running on Port ${PORT}...`);
})